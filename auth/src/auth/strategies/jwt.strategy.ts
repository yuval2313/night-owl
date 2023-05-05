import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { TokenValidatedUser } from '../interfaces/token-validated-user.interface';
import { Request } from 'express';

const configService = new ConfigService();
const secret = configService.get('JWT_SECRET');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  authenticate(req: Request, options?: Object): void {
    this.logger.log('Authenticating given JWT');
    return super.authenticate(req, options);
  }

  validate(payload: TokenPayload): TokenValidatedUser {
    this.logger.log('Successfully authenticated JWT');
    return { userId: payload.sub, username: payload.username };
  }
}
