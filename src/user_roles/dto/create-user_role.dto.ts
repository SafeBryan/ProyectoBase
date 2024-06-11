import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserRoleDto {
  @IsNotEmpty()
  @IsNumber()
  usuarioId: number;

  @IsNotEmpty()
  @IsNumber()
  rolId: number;
}
