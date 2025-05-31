import { ApiProperty } from '@nestjs/swagger';

export class VoluntarioRequestDto {
  @ApiProperty({ example: 'Pedro Leite', description: 'Nome completo do voluntário' })
  nome_completo: string;

  @ApiProperty({ example: '85992070366', description: 'WhatsApp do voluntário' })
  whatsapp: string;

  @ApiProperty({ example: 'Fortaleza - CE', description: 'Cidade e estado do voluntário' })
  cidade_estado: string;
}
