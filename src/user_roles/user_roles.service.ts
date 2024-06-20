import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserRoleDto } from './dto/create-user_role.dto';
import { UpdateUserRoleDto } from './dto/update-user_role.dto';
import { UserRole } from './entities/user_role.entity';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UserRolesService {
  private readonly logger = new Logger(UserRolesService.name);
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async create(createUserRoleDto: CreateUserRoleDto): Promise<UserRole> {
    const user = await this.userRepository.findOne({
      where: { id: createUserRoleDto.usuarioId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const role = await this.rolesRepository.findOne({
      where: { id: createUserRoleDto.rolId },
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const userRole = this.userRoleRepository.create({
      user: user,
      role: role,
    });

    return await this.userRoleRepository.save(userRole);
  }

  async findAll(): Promise<UserRole[]> {
    return await this.userRoleRepository.find({
      relations: ['user', 'role'],
    });
  }

  async findOne(id: number): Promise<UserRole> {
    const userRole = await this.userRoleRepository.findOne({
      where: { id },
      relations: ['user', 'role'],
    });
    if (!userRole) {
      throw new NotFoundException(`UserRole with ID ${id} not found`);
    }
    return userRole;
  }

  async findRoleByName(roleName: string): Promise<Role> {
    return this.rolesRepository.findOne({
      where: { nombre: roleName },
    });
  }

  async update(
    id: number,
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UserRole> {
    this.logger.debug(
      `Updating UserRole with ID: ${id}, Data: ${JSON.stringify(updateUserRoleDto)}`,
    );

    let userRole = await this.userRoleRepository.findOne({
      where: { id },
      relations: ['user', 'role'],
    });

    if (!userRole) {
      this.logger.error(`UserRole with ID ${id} not found`);
      throw new NotFoundException(`UserRole with ID ${id} not found`);
    }

    userRole = this.userRoleRepository.create({
      ...userRole,
      ...updateUserRoleDto,
    });

    const updatedUserRole = await this.userRoleRepository.save(userRole);
    this.logger.debug(`Updated UserRole: ${JSON.stringify(updatedUserRole)}`);

    return updatedUserRole;
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRoleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`UserRole with ID ${id} not found`);
    }
  }
}
