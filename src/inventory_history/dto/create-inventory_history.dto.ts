import { IsNotEmpty, IsNumber, IsDateString, IsString } from 'class-validator';

export class CreateInventoryHistoryDto {
  @IsNotEmpty()
  @IsNumber()
  cambio: number;

  @IsNotEmpty()
  @IsDateString()
  fecha: string;

  @IsNotEmpty()
  @IsString()
  motivo: string;

  @IsNotEmpty()
  @IsNumber()
  productoId: number;
}
