import { ApiProperty } from '@nestjs/swagger';

export class TotalCotasResponseDto {
  @ApiProperty({ example: 10 })
  total: number;
}