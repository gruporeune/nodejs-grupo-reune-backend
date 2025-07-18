import { ApiProperty } from '@nestjs/swagger';

export class SaqueResponseDto {
  @ApiProperty({ example: 'Solicitação de saque registrada com sucesso!' })
  mensagem: string;
}