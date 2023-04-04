import { HttpException, HttpStatus } from '@nestjs/common';

export class DeletePostFailException extends HttpException {
  constructor() {
    super('Delete fail!', HttpStatus.BAD_REQUEST);
  }
}
