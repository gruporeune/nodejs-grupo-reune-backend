import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PremioDiaRequestDto {
  @ApiProperty({ example: 250.50 })
  @IsNumber()
  valor_total: number;
}