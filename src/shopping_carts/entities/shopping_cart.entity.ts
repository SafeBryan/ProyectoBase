import { CartItem } from 'src/cart_items/entities/cart_item.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
  })
  user: User;

  @OneToMany(() => CartItem, (cart_item) => cart_item.shopping_cart)
  cartItems: CartItem[];
}
