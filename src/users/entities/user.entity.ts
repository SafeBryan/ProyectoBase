import { Order } from 'src/orders/entities/order.entity';
import { Role } from '../../common/enums/role.enum';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from 'src/people/entities/person.entity';
import { ShoppingCart } from 'src/shopping_carts/entities/shopping_cart.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];

  @OneToOne(() => Person, (person) => person.id, {
    cascade: true,
  })
  @JoinColumn()
  person: Person;

  @OneToMany(() => ShoppingCart, (shopping_cart) => shopping_cart.user)
  shopping_cart: ShoppingCart[];
}
