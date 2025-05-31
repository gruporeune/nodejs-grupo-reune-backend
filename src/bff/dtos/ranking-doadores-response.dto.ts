import { ApiProperty } from '@nestjs/swagger';

export class RankingDoadoresResponseDto {
  @ApiProperty({
    type: [Object],
    example: [
      { id: 1, nome: 'Caio Wesley', cotas: 10 },
      { id: 2, nome: 'Pedro Leite', cotas: 8 },
    ],
  })
  ranking: any[];
}
