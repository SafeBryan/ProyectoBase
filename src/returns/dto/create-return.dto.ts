import { IsInt, IsString, MinLength } from 'class-validator';

export class CreateReturnDto {
  @IsInt()
  cantidad: number;

  @IsString()
  @MinLength(5)
  motivo: string;

  @IsInt()
  orderItemId: number;
}
