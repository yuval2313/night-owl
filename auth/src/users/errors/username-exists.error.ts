import { CustomHttpException } from '../../errors/custom-http.error';
import { HttpStatus } from '@nestjs/common';

export class UsernameConfictException extends CustomHttpException {
  constructor(username: string, postgresErr: Error) {
    super(
      'Given username already exists',
      HttpStatus.CONFLICT,
      { username },
      { cause: postgresErr, description: 'Conflict' },
    );
  }
}
