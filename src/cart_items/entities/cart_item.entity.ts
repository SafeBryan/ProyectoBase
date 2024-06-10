import { Product } from 'src/products/entities/product.entity';
import { ShoppingCart } from 'src/shopping_carts/entities/shopping_cart.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidadPro: number;

  @ManyToOne(() => ShoppingCart, (shopping_cart) => shopping_cart.cartItems, {
    eager: true,
  })
  shopping_cart: ShoppingCart;

  @ManyToOne(() => Product, (product) => product.cartItems, {
    eager: true,
  })
  product: Product;
}

