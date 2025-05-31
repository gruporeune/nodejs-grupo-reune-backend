import { Injectable } from '@nestjs/common';
import { BffUseCase } from '../use-cases/bff';
import { UsersRegisterRequestDto } from '../dtos/users-register-request.dto';
import { UsersRegisterResponseDto } from '../dtos/users-register-response.dto';
import { UsersLoginRequestDto } from '../dtos/users-login-request.dto';
import { UsersLoginResponseDto } from '../dtos/users-login-response.dto';
import { TotalCotasResponseDto } from '../dtos/total-cotas-response.dto';
import { PremioDiaRequestDto } from '../dtos/premio-dia-request.dto';
import { PremioDiaResponseDto } from '../dtos/premio-dia-response.dto';
import { SaldoColaboradorResponseDto } from '../dtos/saldo-colaborador-response.dto';
import { SaqueRequestDto } from '../dtos/saque-request.dto';
import { SaqueResponseDto } from '../dtos/saque-response.dto';
import { SaquesUsuarioResponseDto } from '../dtos/saques-usuario-response.dto';
import { SaldoDisponivelResponseDto } from '../dtos/saldo-disponivel-response.dto';
import { SaldoAtualizarRequestDto } from '../dtos/saldo-atualizar-request.dto';
import { SaldoAtualizarResponseDto } from '../dtos/saldo-atualizar-response.dto';
import { IndicadosDiretosResponseDto } from '../dtos/indicados-diretos-response.dto';
import { SaldoComissoesResponseDto } from '../dtos/saldo-comissoes-response.dto';
import { RankingDoadoresResponseDto } from '../dtos/ranking-doadores-response.dto';
import { AtividadesRecentesResponseDto } from '../dtos/atividades-recentes-response.dto';
import { VoluntarioRequestDto } from '../dtos/voluntario-request.dto';

@Injectable()
export class BffAdapter {
  constructor(private readonly usecase: BffUseCase) {}

  async handleLogin(data: UsersLoginRequestDto): Promise<UsersLoginResponseDto> {
    return await this.usecase.login(data.email, data.senha);
  }

  async handleRegister(data: UsersRegisterRequestDto): Promise<UsersRegisterResponseDto> {
    const result = await this.usecase.register(data);
    return result;
  }

  async handleTotalCotasPorUsuario(id: number): Promise<TotalCotasResponseDto> {
    return await this.usecase.totalCotasPorUsuario(id);
  }

  async handleTotalCotasGeral(): Promise<TotalCotasResponseDto> {
    return await this.usecase.totalCotasGeral();
  }

  async handleInserirPremioDoDia(data: PremioDiaRequestDto): Promise<{ mensagem: string }> {
    return await this.usecase.inserirPremioDoDia(data.valor_total);
  }

  async handleObterPremioDoDia(): Promise<PremioDiaResponseDto> {
    return await this.usecase.obterPremioDoDia();
  }

  async handleObterSaldoColaborador(id: number): Promise<SaldoColaboradorResponseDto> {
    return await this.usecase.obterSaldoColaborador(id);
  }

  async handleRegistrarSaque(data: SaqueRequestDto): Promise<SaqueResponseDto> {
    return await this.usecase.registrarSaque(data);
  }

  async handleListarSaquesUsuario(id: number): Promise<SaquesUsuarioResponseDto> {
    return await this.usecase.listarSaquesUsuario(id);
  }

  async handleObterSaldoDisponivel(id: number): Promise<SaldoDisponivelResponseDto> {
    return await this.usecase.obterSaldoDisponivel(id);
  }

  async handleAdicionarSaldo(data: SaldoAtualizarRequestDto): Promise<SaldoAtualizarResponseDto> {
    return await this.usecase.adicionarSaldo(data);
  }

  async handleDeduzirSaldo(data: SaldoAtualizarRequestDto): Promise<SaldoAtualizarResponseDto> {
    return await this.usecase.deduzirSaldo(data);
  }

  async handleObterIndicadosDiretos(id: number): Promise<IndicadosDiretosResponseDto> {
    return await this.usecase.obterIndicadosDiretos(id);
  }

  async handleObterSaldoComissoes(id: number): Promise<SaldoComissoesResponseDto> {
    return await this.usecase.obterSaldoComissoes(id);
  }

  async handleObterRankingDoadores(): Promise<RankingDoadoresResponseDto> {
    return await this.usecase.obterRankingDoadores();
  }

  async handleObterAtividadesRecentes(): Promise<AtividadesRecentesResponseDto> {
    return await this.usecase.obterAtividadesRecentes();
  }

  async handleCriarTabelasDoacoesVoluntarios() {
    return await this.usecase.criarTabelasDoacoesVoluntarios();
  }

  async handleRegistrarDoacaoLivre(nome_completo: string, valor: number, file: any): Promise<{ mensagem: string, url: string }> {
    return await this.usecase.registrarDoacaoLivre(nome_completo, valor, file);
  }

  async handleRegistrarVoluntario(data: VoluntarioRequestDto) {
    return await this.usecase.registrarVoluntario(data.nome_completo, data.whatsapp, data.cidade_estado);
  }

  async handleObterPremiosAcumulados(id: number) { return await this.usecase.obterPremiosAcumulados(id); }

  async handleObterUsuarioPorId(id: number) { return await this.usecase.obterUsuarioPorId(id); }

  async handleIniciarSaldos() { return await this.usecase.iniciarSaldos(); }

  async handleAtualizarSaldoDisponivel(id: number) { return await this.usecase.atualizarSaldoDisponivel(id); }

  async handleRegistrarPremioIndividual(data) { return await this.usecase.registrarPremioIndividual(data); }

  async handleRegistrarLucroEspecialistas(valor_total: number) { return await this.usecase.registrarLucroEspecialistas(valor_total); }

  async handleObterLucroEspecialistas() { return await this.usecase.obterLucroEspecialistas(); }

}
