import { ApiProperty } from "@nestjs/swagger";

export class CreateCotaResponseDto {
  @ApiProperty({ example: 'Prêmio registrado com sucesso!' })
  mensagem: string;
}
