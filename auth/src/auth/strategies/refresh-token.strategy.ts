import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { AuthService } from '../auth.service';
import { TokenTypes } from '../interfaces/token-types.enum';
import { TokenValidatedUser } from '../interfaces/token-validated-user.interface';

const configService = new ConfigService();
const secret = configService.get('JWT_REFRESH_SECRET');

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @InjectPinoLogger(RefreshTokenStrategy.name)
    private readonly logger: PinoLogger,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
      passReqToCallback: true,
    });
  }

  private extractTokenFromHeader(req: Request): string {
    return req.get('Authorization').replace('Bearer', '').trim();
  }

  authenticate(req: Request, options?: Object): void {
    this.logger.info('Authenticating given refresh token');
    return super.authenticate(req, options);
  }

  async validate(
    req: Request,
    payload: TokenPayload,
  ): Promise<TokenValidatedUser> {
    this.logger.info('Successfully authenticated refresh token');

    this.logger.info('Validating token credentials');
    const { sub: userId, username } = payload;

    const refreshToken = this.extractTokenFromHeader(req);
    await this.authService.validateToken(
      refreshToken,
      payload,
      TokenTypes.REFRESH,
    );

    this.logger.info('Successfully validated token credentials');

    return { userId, username };
  }
}
