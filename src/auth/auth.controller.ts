import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RefreshTokenDto } from './dto';
import { GetUser } from './decorators/get-user.decorator';
import { AuthGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.OK)
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('/signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @UseGuards(AuthGuard)
  @Get('/refresh')
  refresh(@Body() dto: RefreshTokenDto, @GetUser() userId: number) {
    return this.authService.refresh(dto, userId);
  }

  @Get('/signout')
  signout() {}
}
