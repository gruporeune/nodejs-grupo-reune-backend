import { ApiProperty } from '@nestjs/swagger';

export class VoluntarioResponseDto {
  @ApiProperty({ example: 'Voluntário registrado com sucesso!' })
  mensagem: string;
}
