import { Injectable } from '@nestjs/common';
import { CustomTokenAuthGuard } from './custom-token-auth.guard';

@Injectable()
export class AccessTokenAuthGuard extends CustomTokenAuthGuard('jwt') {}
