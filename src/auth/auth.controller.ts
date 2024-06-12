// src/auth/auth.controller.ts

import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from './decorators/auth.decorators';
import { RoleEnum } from '../common/enums/role.enum';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { userActiveInterface } from '../common/interfaces/user-active.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @Auth(RoleEnum.USER)
    profile(@ActiveUser() user: userActiveInterface) {
        return this.authService.profile(user);
    }
}
