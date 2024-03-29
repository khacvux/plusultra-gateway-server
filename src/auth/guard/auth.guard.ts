import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UnauthorizedException } from '../exceptions';

export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AUTHENTICATION') private readonly authClient: ClientProxy,
  ) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const token = request.headers.authorization.slice(7);
      const canActive = await new Promise<boolean>((resolve) =>
        resolve(
          firstValueFrom(
            this.authClient.send('jwt_passport', {
              token,
            }),
          ),
        ),
      );
      if (!canActive) throw new UnauthorizedException();
      return canActive;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
