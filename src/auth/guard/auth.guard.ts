import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AUTHENTICATION') private readonly authClient: ClientProxy,
  ) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    return new Promise<boolean>((resolve) =>
      resolve(
        firstValueFrom(
          this.authClient.send('jwt_passport', {
            token: request.headers.authorization.slice(7),
          }),
        ),
      ),
    );
  }
}
