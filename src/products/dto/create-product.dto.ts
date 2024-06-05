import { IsNumber, IsString, MinLength, IsInt, IsPositive } from 'class-validator';
import { Column } from 'typeorm';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  precio: number;

  @IsString()
  @MinLength(5)
  categoria: string;
}
