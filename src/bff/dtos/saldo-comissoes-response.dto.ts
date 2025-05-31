import { ApiProperty } from '@nestjs/swagger';

export class SaldoComissoesResponseDto {
  @ApiProperty({ example: 200.75, description: 'Total acumulado de comissões diretas' })
  total: number;
}