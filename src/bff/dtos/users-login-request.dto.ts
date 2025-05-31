import { ApiProperty } from '@nestjs/swagger';

export class UsersLoginRequestDto {
  @ApiProperty({ example: 'caio@exemplo.com', description: 'Email do usuário' })
  email: string;

  @ApiProperty({ example: 'senha123', description: 'Senha do usuário' })
  senha: string;
}
