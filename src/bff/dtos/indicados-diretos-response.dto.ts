import { ApiProperty } from '@nestjs/swagger';

export class IndicadosDiretosResponseDto {
  @ApiProperty({ example: 5, description: 'Total de indicados diretos' })
  total: number;
}
