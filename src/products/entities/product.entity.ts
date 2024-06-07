import {
  Column,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
} from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Brand } from 'src/brands/entities/brand.entity';

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


  @ManyToOne(() => Category, (category) => category.id, {
    eager: true,
  })
  category: Category;

  @ManyToOne(() => Brand, (brand) => brand.id, {
    eager: true,
  })
  brand: Brand;

}
