import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  desc: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  inventory: number;

  @IsNotEmpty()
  @IsNumber()
  moneyType: number;
}
