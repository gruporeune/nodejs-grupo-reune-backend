import { ApiProperty } from '@nestjs/swagger';

export class PremioIndividualResponseDto {
  @ApiProperty({ example: 'Prêmio registrado com sucesso!' })
  mensagem: string;
}
