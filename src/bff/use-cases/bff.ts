import { Injectable } from '@nestjs/common';
import { BffClient } from '../clients/bff';
import { UsersRegisterRequestDto } from '../dtos/users-register-request.dto';
import { SaqueRequestDto } from '../dtos/saque-request.dto';
import { SaldoAtualizarRequestDto } from '../dtos/saldo-atualizar-request.dto';

@Injectable()
export class BffUseCase {
  constructor(private readonly client: BffClient) {}

  async login(email: string, senha: string) {
    return await this.client.login(email, senha);
  }
  
  async register(data: UsersRegisterRequestDto) {
    return await this.client.register(data);
  }

  async totalCotasPorUsuario(id: number) {
    return await this.client.totalCotasPorUsuario(id);
  }

  async totalCotasGeral() {
    return await this.client.totalCotasGeral();
  }

  async inserirPremioDoDia(valor_total: number) {
    return await this.client.inserirPremioDoDia(valor_total);
  }

  async obterPremioDoDia() {
    return await this.client.obterPremioDoDia();
  }

  async obterSaldoColaborador(id: number) {
    return await this.client.obterSaldoColaborador(id);
  }

  async registrarSaque(data: SaqueRequestDto) {
    return await this.client.registrarSaque(data);
  }

  async listarSaquesUsuario(id_usuario: number) {
    return await this.client.listarSaquesUsuario(id_usuario);
  }

  async obterSaldoDisponivel(id_usuario: number) {
    return await this.client.obterSaldoDisponivel(id_usuario);
  }

  async adicionarSaldo(data: SaldoAtualizarRequestDto) {
    return await this.client.adicionarSaldo(data);
  }

  async deduzirSaldo(data: SaldoAtualizarRequestDto) {
    return await this.client.deduzirSaldo(data);
  }

  async obterIndicadosDiretos(idUsuario: number) {
    return await this.client.obterIndicadosDiretos(idUsuario);
  }

  async obterSaldoComissoes(idUsuario: number) {
    return await this.client.obterSaldoComissoes(idUsuario);
  }

  async obterRankingDoadores() {
    return await this.client.obterRankingDoadores();
  }

  async obterAtividadesRecentes() {
    return await this.client.obterAtividadesRecentes();
  }

  async criarTabelasDoacoesVoluntarios() {
    return await this.client.criarTabelasDoacoesVoluntarios();
  }

  async registrarDoacaoLivre(nome_completo: string, valor: number, file: any): Promise<{ mensagem: string, url: string }> {
    return await this.client.registrarDoacaoLivre(nome_completo, valor, file);
  }

  async registrarVoluntario(nome_completo: string, whatsapp: string, cidade_estado: string) {
    return await this.client.registrarVoluntario(nome_completo, whatsapp, cidade_estado);
  }

  async obterPremiosAcumulados(id: number) { 
    return await this.client.obterPremiosAcumulados(id); 
  }
  
  async obterUsuarioPorId(id: number) {
    return await this.client.obterUsuarioPorId(id); 
  }
  
  async iniciarSaldos() {
    return await this.client.iniciarSaldos(); 
  }

  async atualizarSaldoDisponivel(id: number) {
    return await this.client.atualizarSaldoDisponivel(id); 
  }
  
  async registrarPremioIndividual(data) {
    return await this.client.registrarPremioIndividual(data); 
  }
  
  async registrarLucroEspecialistas(valor_total: number) { 
    return await this.client.registrarLucroEspecialistas(valor_total); 
  }
  
  async obterLucroEspecialistas() { 
    return await this.client.obterLucroEspecialistas(); 
  }

}
