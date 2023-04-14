import { IsNotEmpty, IsNumber } from "class-validator";

export class LikePostDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  postId: number;
}
