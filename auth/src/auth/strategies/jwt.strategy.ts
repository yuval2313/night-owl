import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { TokenValidatedUser } from '../interfaces/token-validated-user.interface';
import { Request } from 'express';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

const configService = new ConfigService();
const secret = configService.get('JWT_SECRET');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectPinoLogger(JwtStrategy.name)
    private readonly logger: PinoLogger,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  authenticate(req: Request, options?: Object): void {
    this.logger.info('Authenticating given JWT');
    return super.authenticate(req, options);
  }

  validate(payload: TokenPayload): TokenValidatedUser {
    // TODO: Actually validate user is who he says he is 🚨
    this.logger.info('Successfully authenticated JWT');
    return { userId: payload.sub, username: payload.username };
  }
}
