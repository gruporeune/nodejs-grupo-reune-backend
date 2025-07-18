import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaqueRequestDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id_usuario: number;

  @ApiProperty({ example: 100.00 })
  @IsNumber()
  valor: number;

  @ApiProperty({ example: 'joao@pix.com.br' })
  @IsString()
  chave_pix: string;

  @ApiProperty({ example: 'email' })
  @IsString()
  tipo_pix: string;
}