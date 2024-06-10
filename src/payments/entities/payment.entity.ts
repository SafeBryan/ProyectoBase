import { Order } from '../../orders/entities/order.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  monto: number;

  @Column()
  tipo_pago: string;

  @Column()
  tansaccionId: number;

  @ManyToOne(() => Order, (order) => order.payment, {
    eager: true,
  })
  order: Order;
}
