import { HttpStatus, NotFoundException } from '@nestjs/common';
import { CustomHttpException } from '../../errors/custom-http.error';

export class UserNotFoundException extends CustomHttpException {
  constructor(userId: number) {
    super('Failed to find user', HttpStatus.NOT_FOUND, { userId }, 'Not Found');
  }
}
