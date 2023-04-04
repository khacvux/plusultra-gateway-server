import { HttpException, HttpStatus } from '@nestjs/common';

export class DeleteMediaFailException extends HttpException {
  constructor() {
    super('Delete fail!', HttpStatus.BAD_REQUEST);
  }
}
