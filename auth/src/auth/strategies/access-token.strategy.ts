import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenTypes } from '../interfaces/token-types.enum';
import { CustomTokenStrategy } from './custom-token.strategy';

const configService = new ConfigService();
const secret = configService.get('JWT_ACCESS_SECRET');

@Injectable()
export class AccessTokenStrategy extends CustomTokenStrategy(
  TokenTypes.ACCESS,
  secret,
) {}
