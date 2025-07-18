import { ApiProperty } from '@nestjs/swagger';

export class SaquesUsuarioResponseDto {
  @ApiProperty({
    type: [Object],
    example: [
      { id: 1, valor: 50, data_solicitacao: '2025-07-13T10:00:00Z', status: 'pendente' }
    ]
  })
  saques: {
    id: number;
    valor: number;
    data_solicitacao: string;
    status: string;
  }[];
}