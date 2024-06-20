import { OrderItem } from 'src/order_items/entities/order_item.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Return {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  motivo: string;

  @ManyToOne(() => OrderItem, (orderItem) => orderItem.returns, {
    eager: true,
  })
  orderItem: OrderItem;
}
