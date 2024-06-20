import {
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  estado: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  total: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  impuestos: number;

  @IsString()
  @MinLength(1)
  username: string;
}
