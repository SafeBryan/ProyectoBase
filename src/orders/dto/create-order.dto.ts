import { IsInt, IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateOrderDto {

  @IsString()
  estado: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  total: number;

  @IsString()
  @MinLength(5)
  user: string;

}