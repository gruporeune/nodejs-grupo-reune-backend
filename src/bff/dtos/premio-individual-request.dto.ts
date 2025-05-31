import { ApiProperty } from '@nestjs/swagger';

export class PremioIndividualRequestDto {
  @ApiProperty({ example: 1, description: 'ID do usuário' })
  id_usuario: number;

  @ApiProperty({ example: 100.00, description: 'Valor do prêmio' })
  valor: number;
}
