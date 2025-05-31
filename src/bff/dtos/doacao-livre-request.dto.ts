import { ApiProperty } from '@nestjs/swagger';

export class DoacaoLivreRequestDto {
  @ApiProperty({ example: 'Pedro Leite', description: 'Nome completo do doador' })
  nome_completo: string;

  @ApiProperty({ example: 150.00, description: 'Valor da doação' })
  valor: number;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Comprovante da doação' })
  comprovante: any;
}
