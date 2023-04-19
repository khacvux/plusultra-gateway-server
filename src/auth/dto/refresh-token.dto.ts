import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class RefreshTokenDto {
    @IsString()
    @IsNotEmpty()
    refreshToken: string
}