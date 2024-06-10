import { IsInt } from 'class-validator';

export class CreateOrderItemDto {
  @IsInt()
  cantidadPro: number;

  @IsInt()
  precio: number;

  @IsInt()
  orderId: number;

  @IsInt()
  productoId: number;
}
