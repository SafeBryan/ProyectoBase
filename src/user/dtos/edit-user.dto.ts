import { IsString, IsEmail, MinLength, MaxLength, IsOptional } from "class-validator";

export class EditUserDto {
    @IsOptional()
    @IsString()
    @MaxLength(225)
    name?: string;

    @IsOptional()
    @IsString()
    @MaxLength(225)
    lastname?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(8)
    @MaxLength(128)
    password?: string;
}
