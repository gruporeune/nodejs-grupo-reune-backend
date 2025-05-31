import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2/promise';
import * as bcrypt from 'bcrypt';
import { UsersRegisterRequestDto } from '../dtos/users-register-request.dto';
import { SaqueRequestDto } from '../dtos/saque-request.dto';
import { SaldoAtualizarRequestDto } from '../dtos/saldo-atualizar-request.dto';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { PremioIndividualRequestDto } from '../dtos/premio-individual-request.dto';

@Injectable()
export class BffClient implements OnModuleInit {
  private db;

  constructor(private readonly configService: ConfigService) {
    this.db = mysql.createPool({
      host: this.configService.get<string>('DB_HOST'),
      port: Number(this.configService.get<number>('DB_PORT')),
      user: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  async onModuleInit() {
    try {
      cloudinary.config({
        cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
        api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
        api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
      });

      const connection = await this.db.getConnection();
      console.log('✅ Conexão com MySQL e Cloudinary configurado!');
      connection.release();
    } catch (error) {
      console.error('❌ Erro ao conectar ao banco MySQL ou configurar Cloudinary:', error);
    }
  }

  async register(data: UsersRegisterRequestDto) {
    const hashedPassword = await bcrypt.hash(data.senha, 10);
    const sql = 'INSERT INTO usuarios (nome, email, telefone, senha) VALUES (?, ?, ?, ?)';
    const values = [data.nome, data.email, data.telefone, hashedPassword];

    try {
      await this.db.query(sql, values);
      return {
        success: true,
        usuario: { nome: data.nome, email: data.email, telefone: data.telefone },
      };
    } catch (err: any) {
      console.error('Erro SQL:', err);
      throw new Error(`Erro ao cadastrar usuário: ${err.message}`);
    }
  }

  async login(email: string, senha: string) {
    const [usuarios] = await this.db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    const usuario = (usuarios as any[])[0] || null;
    if (!usuario) throw new Error('Email ou senha inválidos.');

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) throw new Error('Email ou senha inválidos.');

    return { id: usuario.id, nome: usuario.nome, email: usuario.email };
  }

  async totalCotasPorUsuario(id: number): Promise<{ total: number }> {
    const [results] = await this.db.query(
      `SELECT SUM(qtd_cotas) AS total FROM cotas WHERE id_usuario = ? AND status = 'aprovado'`,
      [id]
    );
    const total = results[0]?.total || 0;
    return { total };
  }

  async totalCotasGeral(): Promise<{ total: number }> {
    const [results] = await this.db.query(
      `SELECT SUM(qtd_cotas) AS total FROM cotas WHERE status = 'aprovado'`
    );
    const total = results[0]?.total || 0;
    return { total };
  }

  async inserirPremioDoDia(valor_total: number): Promise<{ mensagem: string }> {
    const sql = `INSERT INTO premio_dia (valor_total) VALUES (?)`;
    await this.db.query(sql, [valor_total]);
    return { mensagem: 'Valor do prêmio do dia salvo com sucesso!' };
  }

  async obterPremioDoDia(): Promise<{ valor_total: number }> {
    const [results] = await this.db.query(
      `SELECT valor_total FROM premio_dia ORDER BY data_registro DESC LIMIT 1`
    );
    const valor_total = results[0]?.valor_total || 0;
    return { valor_total };
  }

  async obterSaldoColaborador(id: number): Promise<{ saldo: number }> {
    const dataHoje = new Date().toISOString().slice(0, 10);
    const [results] = await this.db.query(
      `SELECT SUM(valor_contribuicao * 0.10) AS saldo 
      FROM indicacoes 
      WHERE indicou_id = ? AND data_contribuicao = ?`,
      [id, dataHoje]
    );
    const saldo = results[0]?.saldo || 0;
    return { saldo: parseFloat(saldo.toFixed(2)) };
  }

  async registrarSaque(data: SaqueRequestDto): Promise<{ mensagem: string }> {
    const sql = `
      INSERT INTO saques (id_usuario, valor, chave_pix, tipo_pix)
      VALUES (?, ?, ?, ?)
    `;
    await this.db.query(sql, [data.id_usuario, data.valor, data.chave_pix, data.tipo_pix]);
    return { mensagem: 'Solicitação de saque registrada com sucesso!' };
  }

  async listarSaquesUsuario(id_usuario: number): Promise<{ saques: any[] }> {
    const [results] = await this.db.query(
      `SELECT id, valor, data_solicitacao, status
      FROM saques
      WHERE id_usuario = ?
      ORDER BY data_solicitacao DESC`,
      [id_usuario]
    );
    return { saques: results };
  }

  async obterSaldoDisponivel(id_usuario: number): Promise<{ saldo: number }> {
    const [results] = await this.db.query(
      `SELECT saldo FROM saldos_usuario WHERE id_usuario = ?`,
      [id_usuario]
    );
    const saldo = results[0]?.saldo || 0;
    return { saldo };
  }

  async adicionarSaldo(data: SaldoAtualizarRequestDto): Promise<{ mensagem: string }> {
    const sql = `
      INSERT INTO saldos_usuario (id_usuario, saldo)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE saldo = saldo + VALUES(saldo), atualizado_em = NOW()
    `;
    await this.db.query(sql, [data.id_usuario, data.valor]);
    return { mensagem: 'Saldo atualizado com sucesso!' };
  }

  async deduzirSaldo(data: SaldoAtualizarRequestDto): Promise<{ mensagem: string }> {
    const sql = `
      UPDATE saldos_usuario
      SET saldo = saldo - ?, atualizado_em = NOW()
      WHERE id_usuario = ? AND saldo >= ?
    `;
    const [result] = await this.db.query(sql, [data.valor, data.id_usuario, data.valor]);
    if (result.affectedRows === 0) {
      throw new Error('Saldo insuficiente ou usuário não encontrado.');
    }
    return { mensagem: 'Saldo deduzido com sucesso!' };
  }

  async obterIndicadosDiretos(idUsuario: number): Promise<{ total: number }> {
    const [results] = await this.db.query(
      `SELECT COUNT(*) AS total FROM usuarios WHERE id_indicador = ?`,
      [idUsuario]
    );
    const total = results[0]?.total || 0;
    return { total };
  }

  async obterSaldoComissoes(idUsuario: number): Promise<{ total: number }> {
    const [results] = await this.db.query(
      `SELECT SUM(valor_comissao) AS total 
      FROM comissoes 
      WHERE id_usuario = ? AND tipo = 'direta'`,
      [idUsuario]
    );
    const total = results[0]?.total || 0;
    return { total };
  }

  async obterRankingDoadores(): Promise<{ ranking: any[] }> {
    const [results] = await this.db.query(`
      SELECT usuarios.id, usuarios.nome, SUM(cotas.quantidade) AS cotas
      FROM usuarios
      JOIN cotas ON usuarios.id = cotas.id_usuario
      WHERE cotas.status = 'aprovado'
      GROUP BY usuarios.id, usuarios.nome
      ORDER BY cotas DESC
      LIMIT 10
    `);
    return { ranking: results };
  }

  async obterAtividadesRecentes(): Promise<{ atividades: any[] }> {
    const [results] = await this.db.query(`
      SELECT tipo, usuario, cotas, posicao, DATE_FORMAT(data_hora, "%d %b %Y às %H:%i") as timestamp
      FROM atividades_doadores
      ORDER BY data_hora DESC
      LIMIT 10
    `);
    return { atividades: results };
  }

  async criarTabelasDoacoesVoluntarios(): Promise<{ mensagem: string }> {
    await this.db.query(`
      CREATE TABLE IF NOT EXISTS doacoes_livres (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome_completo VARCHAR(255),
        valor DECIMAL(10,2),
        comprovante_url VARCHAR(255),
        data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await this.db.query(`
      CREATE TABLE IF NOT EXISTS voluntarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome_completo VARCHAR(255),
        whatsapp VARCHAR(20),
        cidade_estado VARCHAR(100),
        data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    return { mensagem: 'Tabelas criadas ou já existentes!' };
  }

  async registrarDoacaoLivre(nome_completo: string, valor: number, file: any): Promise<{ mensagem: string, url: string }> {
    const uploadResult = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'doacoes_comprovantes' },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      streamifier.createReadStream(file.buffer).pipe(stream);
    });

    const comprovante_url = uploadResult.secure_url;
    await this.db.query(
      `INSERT INTO doacoes_livres (nome_completo, valor, comprovante_url) VALUES (?, ?, ?)`,
      [nome_completo, valor, comprovante_url]
    );
    return { mensagem: '✅ Doação registrada com sucesso!', url: comprovante_url };
  }

  async registrarVoluntario(nome_completo: string, whatsapp: string, cidade_estado: string): Promise<{ mensagem: string }> {
    await this.db.query(
      `INSERT INTO voluntarios (nome_completo, whatsapp, cidade_estado) VALUES (?, ?, ?)`,
      [nome_completo, whatsapp, cidade_estado]
    );
    return { mensagem: 'Voluntário registrado com sucesso!' };
  }

  async obterPremiosAcumulados(id: number): Promise<{ total: number }> {
    const [results] = await this.db.query(
      `SELECT SUM(valor) AS total FROM premios_recebidos WHERE id_usuario = ?`,
      [id]
    );
    return { total: results[0]?.total || 0 };
  }

  async obterUsuarioPorId(id: number): Promise<any> {
    const [results] = await this.db.query(
      `SELECT id, nome, email, telefone, status, whatsapp, cpf FROM usuarios WHERE id = ?`,
      [id]
    );
    return results[0] || null;
  }

  async iniciarSaldos(): Promise<{ mensagem: string }> {
    await this.db.query(`
      INSERT INTO saldos_usuario (id_usuario, saldo, atualizado_em)
      SELECT u.id, 0.00, NOW()
      FROM usuarios u
      WHERE NOT EXISTS (
        SELECT 1 FROM saldos_usuario s WHERE s.id_usuario = u.id
      )
    `);
    return { mensagem: 'Saldos iniciados com sucesso!' };
  }

  async atualizarSaldoDisponivel(id: number): Promise<any> {
    const [premioResult] = await this.db.query(
      `SELECT valor_total FROM premio_dia ORDER BY data_registro DESC LIMIT 1`
    );
    const premio = premioResult[0]?.valor_total || 0;
    const hoje = new Date().toISOString().slice(0, 10);
    const [comissaoResult] = await this.db.query(
      `SELECT SUM(valor_contribuicao * 0.10) AS comissao FROM indicacoes WHERE indicou_id = ? AND data_contribuicao = ?`,
      [id, hoje]
    );
    const comissao = comissaoResult[0]?.comissao || 0;
    const valorTotal = premio + comissao;
    await this.db.query(
      `INSERT INTO saldos_usuario (id_usuario, saldo, atualizado_em)
      VALUES (?, ?, NOW())
      ON DUPLICATE KEY UPDATE saldo = saldo + VALUES(saldo), atualizado_em = NOW()`,
      [id, valorTotal]
    );
    return { mensagem: 'Saldo atualizado com sucesso!', premio, comissao, acumulado: valorTotal };
  }

  async registrarPremioIndividual(data: PremioIndividualRequestDto): Promise<{ mensagem: string }> {
    await this.db.query(
      `INSERT INTO premios_recebidos (id_usuario, valor, data_registro) VALUES (?, ?, CURDATE())`,
      [data.id_usuario, data.valor]
    );
    return { mensagem: 'Prêmio registrado com sucesso!' };
  }

  async registrarLucroEspecialistas(valor_total: number): Promise<{ mensagem: string }> {
    await this.db.query(`INSERT INTO lucro_especialistas (valor_total) VALUES (?)`, [valor_total]);
    return { mensagem: 'Lucro dos especialistas salvo com sucesso!' };
  }

  async obterLucroEspecialistas(): Promise<{ valor_total: number }> {
    const [results] = await this.db.query(
      `SELECT valor_total FROM lucro_especialistas ORDER BY data_registro DESC LIMIT 1`
    );
    return { valor_total: results[0]?.valor_total || 0 };
  }

}
