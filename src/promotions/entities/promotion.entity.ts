import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  discountPercentage: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'promotion_products',
    joinColumn: { name: 'promotionId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'productId', referencedColumnName: 'id' },
  })
  products: Product[];
}
