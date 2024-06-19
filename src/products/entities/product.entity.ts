import {
  Column,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Brand } from 'src/brands/entities/brand.entity';
import { CartItem } from 'src/cart_items/entities/cart_item.entity';
import { OrderItem } from 'src/order_items/entities/order_item.entity';
import { InventoryHistory } from 'src/inventory_history/entities/inventory_history.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  precio: number;

  @Column('decimal', { default: 0 })
  descuento: number;

  @Column('int', { default: 0 })
  stock: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Category, (category) => category.products, {
    eager: true,
  })
  category: Category;

  @ManyToOne(() => Brand, (brand) => brand.products, {
    eager: true,
  })
  brand: Brand;

  @OneToMany(() => CartItem, (cart_item) => cart_item.product)
  cartItems: CartItem[];

  @OneToMany(() => OrderItem, (order_item) => order_item.product)
  orderItems: OrderItem[];

  @OneToMany(() => InventoryHistory, (inventoryHistory) => inventoryHistory.producto)
    inventoryHistories: InventoryHistory[];
}

