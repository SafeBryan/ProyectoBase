import { IsString, MinLength } from "class-validator";

export class CreateShoppingCartDto {

    @IsString()
    @MinLength(5)
    username?: string; 

}
