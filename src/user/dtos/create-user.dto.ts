import {IsString, IsEmail, MinLength, MaxLength, IsOptional} from "class-validator";



export class CreateUserDto {
    @IsOptional()
    @IsString()
    @MaxLength(225)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(225)
    lastname: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(128)
    password: string;

}
