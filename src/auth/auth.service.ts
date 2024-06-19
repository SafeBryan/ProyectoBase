import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRolesService } from 'src/user_roles/user_roles.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly userRolesService: UserRolesService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, email, password, persona } = registerDto;
  
    const userExists = await this.userService.findOneByEmail(email);
  
    if (userExists) {
      throw new BadRequestException('Email already exists');
    }
  
    const hashedPassword = await bcryptjs.hash(password, 10);
    
    // Crear el usuario
    const user = await this.userService.create({
      username,
      email,
      password: hashedPassword,
      persona,
    });
  

    const defaultRole = await this.userService.findRoleByName('user');
    if (!defaultRole) {
      throw new BadRequestException('Default role not found');
    }
  

    await this.userRolesService.create({
      usuarioId: user.id,
      rolId: defaultRole.id
    });
  
    return {
      message: 'User created successfully',
      userId: user.id,
    };
  }
  

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findOneByEmailWithPassword(email);

    if (!user) {
      throw new UnauthorizedException('Email is wrong');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is wrong');
    }


    const roles = user.userRoles.map((userRole) => userRole.role.nombre);
    const payload = { email: user.email, roles };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email,
    };
  }

  async profile({ email }: { email: string }) {
    return await this.userService.findOneByEmail(email);
  }
}
