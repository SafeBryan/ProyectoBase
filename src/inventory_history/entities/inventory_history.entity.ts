import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class InventoryHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cambio: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  motivo: string;

  @ManyToOne(() => Product, (product) => product.inventoryHistories, {
    eager: true,
  })
  producto: Product;
}
