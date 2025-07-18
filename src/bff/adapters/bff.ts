import { Injectable } from '@nestjs/common';
import { BffUseCase } from '../use-cases/bff';

import { UsersRegisterRequestDto } from '../dtos/users-register-request.dto';
import { UsersRegisterResponseDto } from '../dtos/users-register-response.dto';
import { UsersLoginRequestDto } from '../dtos/users-login-request.dto';
import { UsersLoginResponseDto } from '../dtos/users-login-response.dto';
import { TotalCotasResponseDto } from '../dtos/total-cotas-response.dto';
import { PremioDiaRequestDto } from '../dtos/premio-dia-request.dto';
import { PremioDiaResponseDto } from '../dtos/premio-dia-response.dto';
import { SaqueRequestDto } from '../dtos/saque-request.dto';
import { SaqueResponseDto } from '../dtos/saque-response.dto';
import { SaquesUsuarioResponseDto } from '../dtos/saques-usuario-response.dto';
import { SaldoDisponivelResponseDto } from '../dtos/saldo-disponivel-response.dto';
import { SaldoAtualizarRequestDto } from '../dtos/saldo-atualizar-request.dto';
import { SaldoAtualizarResponseDto } from '../dtos/saldo-atualizar-response.dto';
import { PremioIndividualRequestDto } from '../dtos/premio-individual-request.dto';
import { PremioIndividualResponseDto } from '../dtos/premio-individual-response.dto';
import { UsuarioResponseDto } from '../dtos/usuario-response.dto';
import { CreateCotaDto } from '../dtos/create-cota.dto';

@Injectable()
export class BffAdapter {
  constructor(private readonly usecase: BffUseCase) {}

  async handleLogin(data: UsersLoginRequestDto): Promise<{ id: string; access_token: string; nome: string; email: string }> {
    return await this.usecase.login(data.email, data.password);
  }

  async handleRegister(data: UsersRegisterRequestDto): Promise<{ mensagem: string }> {
  return await this.usecase.register(data);
}

  async handleTotalCotasPorUsuario(id: string): Promise<TotalCotasResponseDto> {
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

  async handleRegistrarSaque(data: SaqueRequestDto): Promise<SaqueResponseDto> {
    return await this.usecase.registrarSaque(data);
  }

  async handleListarSaquesUsuario(id: string): Promise<SaquesUsuarioResponseDto> {
    const resultado = await this.usecase.listarSaquesUsuario(id);

    const saques = resultado.saques.map((saque: any) => ({
      id: saque.id,
      valor: saque.amount,
      data_solicitacao: saque.created_at,
      status: saque.status,
    }));

    return { saques };
  }

  async handleObterSaldoDisponivel(id: string): Promise<SaldoDisponivelResponseDto> {
    return await this.usecase.obterSaldoDisponivel(id);
  }

  async handleAdicionarSaldo(data: SaldoAtualizarRequestDto): Promise<SaldoAtualizarResponseDto> {
    return await this.usecase.adicionarSaldo(data);
  }

  async handleDeduzirSaldo(data: SaldoAtualizarRequestDto): Promise<SaldoAtualizarResponseDto> {
    return await this.usecase.deduzirSaldo(data);
  }

  async handleRegistrarPremioIndividual(data: PremioIndividualRequestDto): Promise<PremioIndividualResponseDto> {
    return await this.usecase.registrarPremioIndividual(data);
  }

  async handleObterUsuarioPorId(id: string): Promise<UsuarioResponseDto> {
    const usuario = await this.usecase.obterUsuarioPorId(id);

    return {
      id: usuario.id,
      nome: usuario.nome,
      username: usuario.username,
      telefone: usuario.telefone, 
    };
  }

  async adicionarCotas(request: CreateCotaDto) {
    return this.usecase.adicionarCotas(request);
  }

}
