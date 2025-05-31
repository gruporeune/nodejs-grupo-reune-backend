import { ApiProperty } from '@nestjs/swagger';

export class UsuarioDto {
  @ApiProperty({ example: 1, description: 'ID do usuário' })
  id: number;

  @ApiProperty({ example: 'Caio Wesley', description: 'Nome do usuário' })
  nome: string;

  @ApiProperty({ example: 'caio@exemplo.com', description: 'Email do usuário' })
  email: string;

  @ApiProperty({ example: '$2b$10$abcdef...', description: 'Senha hasheada do usuário' })
  senha: string;
}
