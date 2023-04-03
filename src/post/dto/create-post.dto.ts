import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize } from 'nestjs-form-data';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  caption: string;
}
