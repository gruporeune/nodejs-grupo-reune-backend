import { ApiProperty } from '@nestjs/swagger';

export class SaldoAtualizarResponseDto {
  @ApiProperty({ example: 'Saldo atualizado com sucesso!' })
  mensagem: string;
}
