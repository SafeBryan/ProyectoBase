import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
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
}
