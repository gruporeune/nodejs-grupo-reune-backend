import { ApiProperty } from '@nestjs/swagger';

export class SaqueRequestDto {
  @ApiProperty({ example: 1, description: 'ID do usuário' })
  id_usuario: number;

  @ApiProperty({ example: 200.50, description: 'Valor do saque' })
  valor: number;

  @ApiProperty({ example: 'chavepix@exemplo.com', description: 'Chave Pix do saque' })
  chave_pix: string;

  @ApiProperty({ example: 'email', description: 'Tipo da chave Pix (email, cpf, telefone)' })
  tipo_pix: string;
}
