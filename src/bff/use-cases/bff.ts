import { Injectable } from '@nestjs/common';
import { BffClient } from '../clients/bff';
import { UsersRegisterRequestDto } from '../dtos/users-register-request.dto';
import { SaqueRequestDto } from '../dtos/saque-request.dto';
import { SaldoAtualizarRequestDto } from '../dtos/saldo-atualizar-request.dto';
import { PremioIndividualRequestDto } from '../dtos/premio-individual-request.dto';
import { CreateCotaDto } from '../dtos/create-cota.dto';

@Injectable()
export class BffUseCase {
  constructor(private readonly client: BffClient) {}

  async login(email: string, senha: string) {
    return await this.client.login(email, senha);
  }
  
  async register(data: UsersRegisterRequestDto): Promise<{ mensagem: string }> {
    return await this.client.register(data);
  }

  async totalCotasPorUsuario(id: string) {
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

  async registrarSaque(data: SaqueRequestDto) {
    return await this.client.registrarSaque(data);
  }

  async listarSaquesUsuario(id_usuario: string) {
    return await this.client.listarSaquesUsuario(id_usuario);
  }

  async obterSaldoDisponivel(id_usuario: string) {
    return await this.client.obterSaldoDisponivel(id_usuario);
  }

  async adicionarSaldo(data: SaldoAtualizarRequestDto) {
    return await this.client.adicionarSaldo(data);
  }

  async deduzirSaldo(data: SaldoAtualizarRequestDto) {
    return await this.client.deduzirSaldo(data);
  }

  async registrarPremioIndividual(data: PremioIndividualRequestDto) {
    return await this.client.registrarPremioIndividual(data);
  }
  
  async obterUsuarioPorId(id: string) {
    return await this.client.obterUsuarioPorId(id);
  }

  async adicionarCotas(request: CreateCotaDto) {
    return this.client.insertCota(request);
  }
}
