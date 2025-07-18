import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaldoAtualizarRequestDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id_usuario: number;

  @ApiProperty({ example: 200.00 })
  @IsNumber()
  valor: number;
}