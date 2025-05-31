import { ApiProperty } from '@nestjs/swagger';

export class UsersRegisterRequestDto {
  @ApiProperty({ example: 'Caio Wesley', description: 'Nome completo do usuário' })
  nome: string;

  @ApiProperty({ example: 'caio@exemplo.com', description: 'E-mail do usuário' })
  email: string;

  @ApiProperty({ example: '(11) 99999-9999', description: 'Telefone ou WhatsApp do usuário' })
  telefone: string;

  @ApiProperty({ example: 'senha123', description: 'Senha do usuário' })
  senha: string;
}
