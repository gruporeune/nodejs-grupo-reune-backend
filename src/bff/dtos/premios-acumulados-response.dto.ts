import { ApiProperty } from '@nestjs/swagger';

export class PremiosAcumuladosResponseDto {
  @ApiProperty({ example: 1500.50, description: 'Total acumulado de prêmios' })
  total: number;
}
