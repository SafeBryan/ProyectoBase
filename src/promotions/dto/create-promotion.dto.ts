import { IsInt, IsNumber, IsPositive, IsString, MinLength } from 'class-validator';

export class CreatePromotionDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  descuento: number;
}
