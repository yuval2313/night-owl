import { HttpStatus } from '@nestjs/common';
import { CustomHttpException } from '../../errors/custom-http.error';
import { TokenPayload } from '../interfaces/token-payload.interface';

export class InvalidTokenCredentialsException extends CustomHttpException {
  constructor(token: string, payload: TokenPayload, cause?: Error) {
    super(
      'Invalid token credentials',
      HttpStatus.UNAUTHORIZED,
      { token, payload },
      { cause, description: 'Unauthorized' },
    );
  }
}
