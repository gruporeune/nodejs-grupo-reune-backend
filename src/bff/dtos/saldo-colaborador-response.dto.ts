import { ApiProperty } from '@nestjs/swagger';

export class SaldoColaboradorResponseDto {
  @ApiProperty({ example: 100.50, description: 'Saldo do colaborador no dia' })
  saldo: number;
}
