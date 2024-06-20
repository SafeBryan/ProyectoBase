import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreatePromotionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  discountPercentage: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  productIds: number[];
}
