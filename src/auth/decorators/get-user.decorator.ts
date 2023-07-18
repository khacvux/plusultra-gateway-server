import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
const jwt = new JwtService();

interface IGetUser {
  userId: number,
  roleId: number,
}
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): IGetUser => {
    const request = ctx.switchToHttp().getRequest();
    const decoded: any = jwt.decode(request.headers.authorization.slice(7));
    if (data) {
      return decoded[data];
    }
    return {
      userId: decoded.sub,
      roleId: decoded.roleId,
    };
  },
);
