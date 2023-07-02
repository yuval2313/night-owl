import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { TokenValidatedUser } from '../interfaces/token-validated-user.interface';
import { Request } from 'express';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AuthService } from '../auth.service';
import { TokenTypes } from '../interfaces/token-types.enum';

export function CustomTokenStrategy(type: TokenTypes, secret: string) {
  class TokenStrategy extends PassportStrategy(Strategy, `jwt-${type}`) {
    constructor(
      @InjectPinoLogger(TokenStrategy.name)
      readonly logger: PinoLogger,
      readonly authService: AuthService,
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: secret,
        passReqToCallback: true,
      });
    }

    authenticate(req: Request, options?: Object): void {
      this.logger.info('Authenticating given token');
      super.authenticate(req, options);
    }

    async validate(
      req: Request,
      payload: TokenPayload,
    ): Promise<TokenValidatedUser> {
      this.logger.info('Successfully authenticated token');

      this.logger.info('Validating token credentials');
      const { sub: userId, username } = payload;

      const token = this.extractTokenFromHeader(req);
      await this.authService.validateToken(token, payload, type);

      this.logger.info('Successfully validated token credentials');

      return { userId, username };
    }

    extractTokenFromHeader(req: Request): string {
      this.logger.info('Exctracting token from "Authorization" header');
      return req.get('Authorization').replace('Bearer', '').trim();
    }
  }

  return TokenStrategy;
}
