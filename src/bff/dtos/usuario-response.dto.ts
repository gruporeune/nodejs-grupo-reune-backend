import { ApiProperty } from '@nestjs/swagger';

export class UsuarioResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Pedro Leite' })
  nome: string;

  @ApiProperty({ example: 'pedro@exemplo.com' })
  email: string;

  @ApiProperty({ example: '85999999999' })
  telefone: string;

  @ApiProperty({ example: 'ativo' })
  status: string;

  @ApiProperty({ example: '85999999999' })
  whatsapp: string;

  @ApiProperty({ example: '12345678900' })
  cpf: string;
}
