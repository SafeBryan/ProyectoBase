import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  email: string;
  password: string;
  persona: string;
  username?: string;
}
