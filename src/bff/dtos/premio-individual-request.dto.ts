import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PremioIndividualRequestDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id_usuario: number;

  @ApiProperty({ example: 300.00 })
  @IsNumber()
  valor: number;
}