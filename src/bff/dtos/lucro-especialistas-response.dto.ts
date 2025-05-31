import { ApiProperty } from '@nestjs/swagger';

export class LucroEspecialistasResponseDto {
  @ApiProperty({ example: 4000.00, description: 'Valor do lucro dos especialistas' })
  valor_total: number;
}
