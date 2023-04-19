import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateDiscountDto {
  @IsOptional()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  endDate: Date;

  @IsOptional()
  @IsNumber()
  discount_percent: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  desc: string;
}
