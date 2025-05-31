import { ApiProperty } from '@nestjs/swagger';

export class PremioDiaResponseDto {
  @ApiProperty({ example: 1000.50, description: 'Valor total do prêmio do dia' })
  valor_total: number;
}
