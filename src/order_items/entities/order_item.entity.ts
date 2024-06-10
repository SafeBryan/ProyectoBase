import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Return } from 'src/returns/entities/return.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidadItem: number;

  @Column()
  precio: number;

  @ManyToOne(() => Product, (product) => product.orderItems, {
    eager: true,
  })
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderItems, {
    eager: true,
  })
  order: Order;

  @OneToMany(() => Return, (returns) => returns.orderItem)
  returns: Return[];
}
