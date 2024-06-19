import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  monto: number;

  @IsNotEmpty()
  @IsString()
  tipo_pago: string;

  @IsNotEmpty()
  orderId: number;

  @IsNotEmpty()
  transacionId: number;
}
