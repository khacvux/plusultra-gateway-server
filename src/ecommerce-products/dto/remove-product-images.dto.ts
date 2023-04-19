import { IsArray, IsNotEmpty } from "class-validator";

export class RemoveProductImageDto {
  @IsArray()
  @IsNotEmpty()
  imageIds: string[];
}
