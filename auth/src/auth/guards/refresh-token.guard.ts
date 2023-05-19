import { Injectable } from '@nestjs/common';
import { CustomTokenAuthGuard } from './custom-token-auth.guard';
import { TokenTypes } from '../interfaces/token-types.enum';

@Injectable()
export class RefreshTokenAuthGuard extends CustomTokenAuthGuard(
  TokenTypes.REFRESH,
) {}
