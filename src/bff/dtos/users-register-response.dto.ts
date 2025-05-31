import { ApiProperty } from '@nestjs/swagger';

export class UsersRegisterResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({
    example: {
      nome: 'Caio Wesley',
      email: 'caio@exemplo.com',
      telefone: '(11) 99999-9999',
    },
    description: 'Dados do usuário cadastrado',
  })
  usuario: {
    nome: string;
    email: string;
    telefone: string;
  };
}
