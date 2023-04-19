import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddProductDto {
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
  @IsArray()
  category: number[];

  @IsNotEmpty()
  @IsNumber()
  inventory: number;

  @IsNotEmpty()
  @IsNumber()
  moneyType: number;
}
