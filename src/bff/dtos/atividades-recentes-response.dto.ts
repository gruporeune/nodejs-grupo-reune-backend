import { ApiProperty } from '@nestjs/swagger';

export class AtividadesRecentesResponseDto {
  @ApiProperty({
    type: [Object],
    example: [
      { tipo: 'donation', usuario: 'Pedro', cotas: 2, posicao: null, timestamp: '27 Mai 2025 às 15:30' },
      { tipo: 'new', usuario: 'Caio', cotas: null, posicao: null, timestamp: '27 Mai 2025 às 15:20' },
    ],
  })
  atividades: any[];
}
