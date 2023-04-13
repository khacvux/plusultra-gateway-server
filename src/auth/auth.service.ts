import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthDto, RefreshTokenDto } from './dto';
import {
  CreateUserEvent,
  RefreshTokenEvent,
  SignInEvent,
  SignOutEvent,
} from './events';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTHENTICATION')
    private readonly authClient: ClientProxy,
  ) {}
  async signup(dto: AuthDto) {
    return await firstValueFrom(
      this.authClient.emit(
        'create_user',
        new CreateUserEvent(
          dto.email,
          dto.password,
          dto?.firstname,
          dto?.lastname,
        ),
      ),
    );
  }
  async signin(dto: AuthDto) {
    return await firstValueFrom(
      this.authClient.send('signin', new SignInEvent(dto.email, dto.password)),
    );
  }

  async refresh(dto: RefreshTokenDto, userId: number) {
    return await firstValueFrom(
      this.authClient.send(
        'refresh_token',
        new RefreshTokenEvent(dto.refreshToken, userId),
      ),
    );
  }

  async signout(userId: number) {
    return await firstValueFrom(
      this.authClient.send('sign_out', new SignOutEvent(userId)),
    );
  }
}
