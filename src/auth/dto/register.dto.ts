import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value.trim())
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;

  @IsString() // Puedes ajustar las reglas de validación según tus necesidades
  @IsNotEmpty()
  persona: string;
}
