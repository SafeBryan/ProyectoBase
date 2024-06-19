// src/auth/auth.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from './decorators/auth.decorators';
import { RoleEnum } from '../common/enums/role.enum';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { userActiveInterface } from '../common/interfaces/user-active.interface';
import {
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ description: 'User registration data', type: RegisterDto })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiBody({ description: 'User login data', type: LoginDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @Get('profile')
  @Auth([RoleEnum.ADMIN])
  @ApiResponse({
    status: 200,
    description: 'User profile data retrieved successfully.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Only admins can access this endpoint',
  })
  profile(@ActiveUser() user: userActiveInterface) {
    return this.authService.profile(user);
  }
}
