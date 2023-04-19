import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
const jwt = new JwtService();
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
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
