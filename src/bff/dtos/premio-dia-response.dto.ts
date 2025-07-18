import { ApiProperty } from '@nestjs/swagger';

export class PremioDiaResponseDto {
  @ApiProperty({ example: 250.50 })
  valor_total: number;
}