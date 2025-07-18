import { ApiProperty } from '@nestjs/swagger';

export class UsuarioResponseDto {
  @ApiProperty({ example: 1 })
  id: string;

  @ApiProperty({ example: 'João da Silva' })
  nome: string;

  @ApiProperty({ example: 'joao123' })
  username: string;

  @ApiProperty({ example: 'joao@email.com' })
  email?: string;

  @ApiProperty({ example: '(11) 99999-9999' })
  telefone: string;

  @ApiProperty({ example: 'ativo' })
  status?: string;

  @ApiProperty({ example: '(11) 98888-7777' })
  whatsapp?: string;

  @ApiProperty({ example: '123.456.789-00' })
  cpf?: string;
}