import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RefreshTokenDto } from './dto';
import { GetUser } from './decorators/get-user.decorator';
import { AuthGuard } from './guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @Post('/refresh')
  refresh(@Body() dto: RefreshTokenDto, @GetUser('sub') userId: number) {
    return this.authService.refresh(dto, userId);
  }

  @UseGuards(AuthGuard)
  @Delete('/signout')
  signout(@GetUser() userId: number) {
    return this.authService.signout(userId);
  }
}
