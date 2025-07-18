import { ApiProperty } from '@nestjs/swagger';

export class SaldoDisponivelResponseDto {
  @ApiProperty({ example: 150.75 })
  saldo: number;
}