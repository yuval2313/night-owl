import { Injectable } from '@nestjs/common';
import { CustomTokenAuthGuard } from './custom-token-auth.guard';

@Injectable()
export class RefreshTokenAuthGuard extends CustomTokenAuthGuard(
  'jwt-refresh',
) {}
