import { ApiProperty } from '@nestjs/swagger';

export class DoacaoLivreResponseDto {
  @ApiProperty({ example: 'Doação registrada com sucesso!' })
  mensagem: string;

  @ApiProperty({ example: 'https://cloudinary.com/comprovante123', description: 'URL do comprovante' })
  url: string;
}
