import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { first } from 'rxjs';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from '../common/enums/role.enum';
import { Auth } from './decorators/auth.decorators';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { userActiveInterface } from 'src/common/interfaces/user-active.interface';

interface RequestWithUser extends Request {
  user: { email: string; role: string };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(
    @Body()
    LoginDto: LoginDto,
  ) {
    return this.authService.login(LoginDto);
  }

  //@Get('profile')
  //@Roles(Role.ADMIN)
  //@UseGuards(AuthGuard, RolesGuard)
  //profile(@Req() req: RequestWithUser) {
  //return this.authService.profile(req.user);
  //}

  @Get('profile')
  @Auth(Role.USER)
  profile(@ActiveUser() user: userActiveInterface) {
    return this.authService.profile(user);
  }
}
