import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthDto } from './dto';
import { CreateUserEvent } from './events';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTHENTICATION') private readonly authClient: ClientProxy,
  ) {}
  signup(dto: AuthDto) {
    return this.authClient.emit(
      'create_user',
      new CreateUserEvent(dto.email, dto.password),
    );
  }
  signin(dto: AuthDto) {
    console.log('1312')
    return this.authClient.emit(
      'signin',
      new CreateUserEvent(dto.email, dto.password),
    );
  }
}
