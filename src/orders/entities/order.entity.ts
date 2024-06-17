import { OrderItem } from 'src/order_items/entities/order_item.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn, // Importa CreateDateColumn
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  estado: string;

  @Column()
  total: number;

  @Column()
  impuestos: number;

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
  })
  user: User;

  @OneToMany(() => OrderItem, (order_item) => order_item.order)
  orderItems: OrderItem[];

  @OneToMany(() => Payment, (payment) => payment.order)
  payment: Payment[];

  @CreateDateColumn() 
  createdAt: Date;
}
