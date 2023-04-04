import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { OwnerCheckEvent } from 'src/post/events/check-owner.event';
import { PermissionDeniedException } from '../exceptions/permission-denied.exception';
import { Role } from '../types';

export class Permission implements CanActivate {
  constructor(
    @Inject('AUTHENTICATION') private readonly authClient: ClientProxy,
    private readonly jwtService: JwtService,
    private readonly postId: number,
  ) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      // if (this.role == Role.ADMIN) return false
      const token = request.headers.authorization.slice(7);
      const userId = this.jwtService.decode(token);
      return new Promise<boolean>((resolve) =>
        resolve(
          firstValueFrom(
            this.authClient.send(
              'owner_check',
              new OwnerCheckEvent(this.postId, +userId),
            ),
          ),
        ),
      );
    } catch (error) {
      throw new PermissionDeniedException();
    }
  }
}

