import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  caption: string;
}
