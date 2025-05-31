import { Controller, Post, Body, HttpException, HttpStatus, Get, Param, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { BffAdapter } from '../adapters/bff';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';
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
import { DoacaoLivreRequestDto } from '../dtos/doacao-livre-request.dto';
import { DoacaoLivreResponseDto } from '../dtos/doacao-livre-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { VoluntarioRequestDto } from '../dtos/voluntario-request.dto';
import { VoluntarioResponseDto } from '../dtos/voluntario-response.dto';
import { PremiosAcumuladosResponseDto } from '../dtos/premios-acumulados-response.dto';
import { UsuarioResponseDto } from '../dtos/usuario-response.dto';
import { PremioIndividualRequestDto } from '../dtos/premio-individual-request.dto';
import { PremioIndividualResponseDto } from '../dtos/premio-individual-response.dto';
import { LucroEspecialistasRequestDto } from '../dtos/lucro-especialistas-request.dto';
import { LucroEspecialistasResponseDto } from '../dtos/lucro-especialistas-response.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('api')
export class BffController {
    constructor(
    private readonly adapter: BffAdapter,
    private readonly jwtService: JwtService
  ) {}

  @Post('login')
  @ApiBody({ type: UsersLoginRequestDto })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso', type: UsersLoginResponseDto })
  @ApiResponse({ status: 401, description: 'Email ou senha inválidos' })
  async login(@Body() body: UsersLoginRequestDto) {
    try {
      const usuario = await this.adapter.handleLogin(body);

      const payload = { sub: usuario.id, email: usuario.email };
      const token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET || 'defaultsecret',
        expiresIn: '1d',
      });

      return {
        mensagem: 'Login bem-sucedido!',
        access_token: token,
        usuario,
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: TotalCotasResponseDto })
  async totalCotasPorUsuario(@Param('id') id: string) {
    return await this.adapter.handleTotalCotasPorUsuario(Number(id));
  }

  @Get('total-cotas-geral')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: TotalCotasResponseDto })
  async totalCotasGeral() {
    return await this.adapter.handleTotalCotasGeral();
  }
  
  @Post('premio-do-dia')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: PremioDiaRequestDto })
  @ApiResponse({ status: 200, description: 'Prêmio do dia inserido com sucesso' })
  async inserirPremioDoDia(@Body() data: PremioDiaRequestDto) {
    return await this.adapter.handleInserirPremioDoDia(data);
  }

  @Get('premio-do-dia')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: PremioDiaResponseDto })
  async obterPremioDoDia() {
    return await this.adapter.handleObterPremioDoDia();
  }

  @Get('saldo-colaborador/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: SaldoColaboradorResponseDto })
  async obterSaldoColaborador(@Param('id') id: string) {
    return await this.adapter.handleObterSaldoColaborador(Number(id));
  }

  @Post('saques')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: SaqueRequestDto })
  @ApiResponse({ status: 200, type: SaqueResponseDto })
  async registrarSaque(@Body() data: SaqueRequestDto) {
    return await this.adapter.handleRegistrarSaque(data);
  }

  @Get('saques/:id_usuario')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: SaquesUsuarioResponseDto })
  async listarSaquesUsuario(@Param('id_usuario') id_usuario: string) {
    return await this.adapter.handleListarSaquesUsuario(Number(id_usuario));
  }

  @Get('saldo-disponivel/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: SaldoDisponivelResponseDto })
  async obterSaldoDisponivel(@Param('id') id: string) {
    return await this.adapter.handleObterSaldoDisponivel(Number(id));
  }

  @Post('saldo-disponivel/adicionar')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: SaldoAtualizarRequestDto })
  @ApiResponse({ status: 200, type: SaldoAtualizarResponseDto })
  async adicionarSaldo(@Body() data: SaldoAtualizarRequestDto) {
    return await this.adapter.handleAdicionarSaldo(data);
  }

  @Post('saldo-disponivel/deduzir')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: SaldoAtualizarRequestDto })
  @ApiResponse({ status: 200, type: SaldoAtualizarResponseDto })
  async deduzirSaldo(@Body() data: SaldoAtualizarRequestDto) {
    return await this.adapter.handleDeduzirSaldo(data);
  }

  @Get('indicados-diretos/:idUsuario')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: IndicadosDiretosResponseDto })
  async obterIndicadosDiretos(@Param('idUsuario') idUsuario: string) {
    return await this.adapter.handleObterIndicadosDiretos(Number(idUsuario));
  }

  @Get('saldo-comissoes/:idUsuario')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: SaldoComissoesResponseDto })
  async obterSaldoComissoes(@Param('idUsuario') idUsuario: string) {
    return await this.adapter.handleObterSaldoComissoes(Number(idUsuario));
  }

  @Get('ranking-doadores')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: RankingDoadoresResponseDto })
  async obterRankingDoadores() {
    return await this.adapter.handleObterRankingDoadores();
  }

  @Get('atividades-recentes')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: AtividadesRecentesResponseDto })
  async obterAtividadesRecentes() {
    return await this.adapter.handleObterAtividadesRecentes();
  }

  @Get('criar-tabela-doacoes-voluntarios')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async criarTabelas() {
    return await this.adapter.handleCriarTabelasDoacoesVoluntarios();
  }

  @Post('doacoes-livres')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: DoacaoLivreRequestDto })
  @ApiResponse({ status: 200, type: DoacaoLivreResponseDto })
  @UseInterceptors(FileInterceptor('comprovante'))
  async registrarDoacaoLivre(@UploadedFile() file: any, @Body() data: any) {
    const { nome_completo, valor } = data;
    return await this.adapter.handleRegistrarDoacaoLivre(nome_completo, valor, file);
  }

  @Post('voluntarios')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: VoluntarioRequestDto })
  @ApiResponse({ status: 200, type: VoluntarioResponseDto })
  async registrarVoluntario(@Body() data: VoluntarioRequestDto) {
    return await this.adapter.handleRegistrarVoluntario(data);
  }
  
  @Get('premios-acumulados/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: PremiosAcumuladosResponseDto })
  async obterPremiosAcumulados(@Param('id') id: string) {
    return await this.adapter.handleObterPremiosAcumulados(Number(id));
  }

  @Get('usuario/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UsuarioResponseDto })
  async obterUsuarioPorId(@Param('id') id: string) {
    return await this.adapter.handleObterUsuarioPorId(Number(id));
  }

  @Get('iniciar-saldos')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async iniciarSaldos() {
    return await this.adapter.handleIniciarSaldos();
  }

  @Post('atualizar-saldo-disponivel/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async atualizarSaldoDisponivel(@Param('id') id: string) {
    return await this.adapter.handleAtualizarSaldoDisponivel(Number(id));
  }

  @Post('registrar-premio')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: PremioIndividualRequestDto })
  @ApiResponse({ status: 200, type: PremioIndividualResponseDto })
  async registrarPremioIndividual(@Body() data: PremioIndividualRequestDto) {
    return await this.adapter.handleRegistrarPremioIndividual(data);
  }

  @Post('lucro-especialistas')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: LucroEspecialistasRequestDto })
  async registrarLucroEspecialistas(@Body() data: LucroEspecialistasRequestDto) {
    return await this.adapter.handleRegistrarLucroEspecialistas(data.valor_total);
  }

  @Get('lucro-especialistas')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: LucroEspecialistasResponseDto })
  async obterLucroEspecialistas() {
    return await this.adapter.handleObterLucroEspecialistas();
  }
}