import { ApiProperty } from '@nestjs/swagger';

export class SaldoAtualizarRequestDto {
  @ApiProperty({ example: 1, description: 'ID do usuário' })
  id_usuario: number;

  @ApiProperty({ example: 100.00, description: 'Valor a adicionar ou deduzir' })
  valor: number;
}
