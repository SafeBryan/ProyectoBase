import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInventoryHistoryDto {
  @IsNotEmpty()
  @IsNumber()
  cambio: number;

  @IsNotEmpty()
  @IsString()
  motivo: string;

  @IsNotEmpty()
  @IsNumber()
  productoId: number;
}
