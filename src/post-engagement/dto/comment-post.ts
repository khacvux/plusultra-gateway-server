import { IsNotEmpty, IsString } from 'class-validator';

export class CommentPostDto {
  @IsString()
  @IsNotEmpty()
  comment: string;

  userId: number;
  postId: number;
}
