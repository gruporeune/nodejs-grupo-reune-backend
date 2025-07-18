import { ApiProperty } from '@nestjs/swagger';

export class UsersRegisterResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty({
    example: {
      nome: 'João da Silva',
      email: 'joao@email.com',
      telefone: '(11) 99999-9999'
    }
  })
  usuario: {
    nome: string;
    email: string;
    telefone: string;
  };
}