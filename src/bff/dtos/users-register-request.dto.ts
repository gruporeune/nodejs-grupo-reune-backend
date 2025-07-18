import { ApiProperty } from '@nestjs/swagger';

export class UsersRegisterRequestDto {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  whatsapp: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ description: 'ID de quem indicou o usuário', required: false })
  referredBy?: string;
}
