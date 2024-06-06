import { User } from 'src/users/entities/user.entity';
import {
  Column,
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

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
  })
  user: User;
}
