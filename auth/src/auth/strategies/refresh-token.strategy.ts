import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenTypes } from '../interfaces/token-types.enum';
import { CustomTokenStrategy } from './custom-token.strategy';

const configService = new ConfigService();
const secret = configService.get('JWT_REFRESH_SECRET');

@Injectable()
export class RefreshTokenStrategy extends CustomTokenStrategy(
  TokenTypes.REFRESH,
  secret,
) {}
