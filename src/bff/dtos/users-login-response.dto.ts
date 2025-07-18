import { ApiProperty } from '@nestjs/swagger';

class UsuarioDto {
  @ApiProperty({ example: 'token' })
  access_token: string;

  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'João da Silva' })
  nome: string;

  @ApiProperty({ example: 'joao@email.com' })
  email: string;
}

export class UsersLoginResponseDto {
  @ApiProperty({ example: 'Login bem-sucedido!' })
  mensagem: string;

  @ApiProperty({ example: 'jwt.token.aqui' })
  access_token: string;

  @ApiProperty({ type: UsuarioDto })
  usuario: UsuarioDto;
}
