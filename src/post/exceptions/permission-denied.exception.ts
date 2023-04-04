import { HttpException, HttpStatus } from '@nestjs/common';

export class PermissionException extends HttpException {
  constructor() {
    super('Permission denied!', HttpStatus.BAD_REQUEST);
  }
}
