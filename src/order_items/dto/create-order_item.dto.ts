import { IsInt } from 'class-validator';

export class CreateOrderItemDto {
  @IsInt()
  cantidadItem: number;

  @IsInt()
  precio: number;

  @IsInt()
  orderId: number;

  @IsInt()
  productoId: number;
}