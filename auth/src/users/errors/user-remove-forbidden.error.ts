import { HttpStatus } from '@nestjs/common';
import { CustomHttpException } from '../../errors/custom-http.error';

export class UserRemoveForbiddenException extends CustomHttpException {
  constructor(targetUserId: number, userId: number) {
    super(
      'Failed to delete user',
      HttpStatus.FORBIDDEN,
      {
        targetUserId,
        userId,
      },
      'Forbidden',
    );
  }
}
