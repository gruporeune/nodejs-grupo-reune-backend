import { ApiProperty } from '@nestjs/swagger';

export class SaquesUsuarioResponseDto {
  @ApiProperty({
    type: [Object],
    example: [
      { id: 1, valor: 100, data_solicitacao: '2024-05-30', status: 'pendente' },
      { id: 2, valor: 200, data_solicitacao: '2024-05-29', status: 'aprovado' }
    ],
  })
  saques: any[];
}
