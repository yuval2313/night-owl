import { HttpStatus } from '@nestjs/common';
import { CustomHttpException } from '../../errors/custom-http.error';

export class InvalidCredentialsException extends CustomHttpException {
  constructor(username: string) {
    super(
      'Invalid user credentials',
      HttpStatus.UNAUTHORIZED,
      { username },
      'Unauthorized',
    );
  }
}
