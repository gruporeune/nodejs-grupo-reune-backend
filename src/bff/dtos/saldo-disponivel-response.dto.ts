import { ApiProperty } from '@nestjs/swagger';

export class SaldoDisponivelResponseDto {
  @ApiProperty({ example: 500.75, description: 'Saldo disponível para saque' })
  saldo: number;
}
