import { IsInt } from 'class-validator';

export class CreateCartItemDto {
  @IsInt()
  cantidadPro: number;

  @IsInt()
  carritoId: number;

  @IsInt()
  productoId: number;
}
