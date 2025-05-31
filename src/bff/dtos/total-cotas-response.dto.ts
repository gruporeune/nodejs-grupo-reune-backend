import { ApiProperty } from '@nestjs/swagger';

export class TotalCotasResponseDto {
  @ApiProperty({ example: 10, description: 'Total de cotas aprovadas' })
  total: number;
}
