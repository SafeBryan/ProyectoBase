import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePersonDto {
  @IsString()
  name: string;

  @IsString()
  @MinLength(2)
  apellido: string;

  @IsNumber()
  telefono: number;

  @IsString()
  direccion: string;
}
