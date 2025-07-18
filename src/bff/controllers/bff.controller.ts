import { Controller, Post, Body, HttpException, HttpStatus, Get, Param, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseAuthGuard } from '../guards/jwt-auth.guard';
import { BffAdapter } from '../adapters/bff';
import {
  ApiBearerAuth,
  ApiBody,
  ApiResponse
} from '@nestjs/swagger';
import { UsersLoginRequestDto } from '../dtos/users-login-request.dto';
import { UsersLoginResponseDto } from '../dtos/users-login-response.dto';
import { UsersRegisterRequestDto } from '../dtos/users-register-request.dto';
import { UsersRegisterResponseDto } from '../dtos/users-register-response.dto';
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
import { CreateCotaResponseDto } from '../dtos/create-cota-response.dto';

@Controller('api')
export class BffController {
  constructor(
    private readonly adapter: BffAdapter,
    private readonly jwtService: JwtService
  ) {}

  @Post('login')
  @ApiBody({ type: UsersLoginRequestDto })
  @ApiResponse({ status: 200, type: UsersLoginResponseDto })
  async login(@Body() body: UsersLoginRequestDto): Promise<UsersLoginResponseDto> {
    try {
      const usuario = await this.adapter.handleLogin(body);

      return {
        mensagem: 'Login bem-sucedido!',
        access_token: usuario.access_token,
        usuario: usuario
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }



  @Post('cadastrar')
  @ApiBody({ type: UsersRegisterRequestDto })
  @ApiResponse({ status: 200, type: UsersRegisterResponseDto })
  async cadastrar(@Body() data: UsersRegisterRequestDto) {
    try {
      return await this.adapter.handleRegister(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('total-cotas/:id')
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: TotalCotasResponseDto })
  async totalCotasPorUsuario(@Param('id') id: string) {
    return await this.adapter.handleTotalCotasPorUsuario(id);
  }

  @Get('total-cotas-geral')
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: TotalCotasResponseDto })
  async totalCotasGeral() {
    return await this.adapter.handleTotalCotasGeral();
  }

  @Post('premio-do-dia')
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: PremioDiaRequestDto })
  @ApiResponse({ status: 200 })
  async inserirPremioDoDia(@Body() data: PremioDiaRequestDto) {
    return await this.adapter.handleInserirPremioDoDia(data);
  }

  @Get('premio-do-dia')
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: PremioDiaResponseDto })
  async obterPremioDoDia() {
    return await this.adapter.handleObterPremioDoDia();
  }

  @Post('saques')
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: SaqueRequestDto })
  @ApiResponse({ status: 200, type: SaqueResponseDto })
  async registrarSaque(@Body() data: SaqueRequestDto) {
    return await this.adapter.handleRegistrarSaque(data);
  }

  @Get('saques/:id_usuario')
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: SaquesUsuarioResponseDto })
  async listarSaquesUsuario(@Param('id_usuario') id_usuario: string) {
    return await this.adapter.handleListarSaquesUsuario(id_usuario);
  }

  @Get('saldo-disponivel/:id')
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: SaldoDisponivelResponseDto })
  async obterSaldoDisponivel(@Param('id') id: string) {
    return await this.adapter.handleObterSaldoDisponivel(id);
  }

  @Post('saldo-disponivel/adicionar')
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: SaldoAtualizarRequestDto })
  @ApiResponse({ status: 200, type: SaldoAtualizarResponseDto })
  async adicionarSaldo(@Body() data: SaldoAtualizarRequestDto) {
    return await this.adapter.handleAdicionarSaldo(data);
  }

  @Post('saldo-disponivel/deduzir')
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: SaldoAtualizarRequestDto })
  @ApiResponse({ status: 200, type: SaldoAtualizarResponseDto })
  async deduzirSaldo(@Body() data: SaldoAtualizarRequestDto) {
    return await this.adapter.handleDeduzirSaldo(data);
  }

  @Post('registrar-premio')
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: PremioIndividualRequestDto })
  @ApiResponse({ status: 200, type: PremioIndividualResponseDto })
  async registrarPremioIndividual(@Body() data: PremioIndividualRequestDto) {
    return await this.adapter.handleRegistrarPremioIndividual(data);
  }

  @Get('usuario/:id')
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UsuarioResponseDto })
  async obterUsuarioPorId(@Param('id') id: string) {
    return await this.adapter.handleObterUsuarioPorId(id);
  }

  @Post('adicionar-cotas')
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: CreateCotaDto })
  @ApiResponse({ status: 200, type: CreateCotaResponseDto })
  async adicionarCotas(
    @Body() request: CreateCotaDto) {
    return this.adapter.adicionarCotas(request);
  }

}
