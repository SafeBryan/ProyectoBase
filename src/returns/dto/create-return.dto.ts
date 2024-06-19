import { IsDate, IsInt, IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateReturnDto {
    

    @IsString()
    cantidad: number;
  
    @IsDate()
    fecha: Date;
  
    @IsString()
    @MinLength(5)
    motivo: string;

    @IsString()
    orderItemId:number;
}