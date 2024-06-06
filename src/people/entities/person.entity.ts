import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  apellido: string;

  @Column()
  telefono: number;

  @Column()
  direccion: string;

  @OneToOne(() => User, (user) => user.person)
  user: User[];
}
