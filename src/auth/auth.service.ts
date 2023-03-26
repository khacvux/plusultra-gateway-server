import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
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
  async signin(dto: AuthDto) {
    const returned = await firstValueFrom(
      this.authClient.send(
        'signin',
        new CreateUserEvent(dto.email, dto.password),
      ),
    );
    console.log(returned);
  }
}
