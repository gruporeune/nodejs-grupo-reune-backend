import { ApiProperty } from '@nestjs/swagger';

export class LucroEspecialistasRequestDto {
  @ApiProperty({ example: 4000.00, description: 'Valor total do lucro dos especialistas' })
  valor_total: number;
}
