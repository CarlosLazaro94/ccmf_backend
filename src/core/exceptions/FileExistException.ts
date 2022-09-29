import { HttpException, HttpStatus } from '@nestjs/common';
export class FileExistException extends HttpException {

  constructor() {
    super('File exist', HttpStatus.FORBIDDEN)
  }
}