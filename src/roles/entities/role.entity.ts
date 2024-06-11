import { UserRole } from 'src/user_roles/entities/user_role.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => UserRole, (userRoles) => userRoles.rol)
  userRoles: UserRole[];
}
