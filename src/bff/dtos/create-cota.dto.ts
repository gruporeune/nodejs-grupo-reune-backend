import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateCotaDto {
  @ApiProperty({ example: '' })
  @IsString()  
  userId: string;         
  
  @ApiProperty({ example: 0 })
  @IsNumber()  
  quantity: number; 
  
  @ApiProperty({ example: 0 })
  @IsNumber() 
  amountPaid: number; 
}
