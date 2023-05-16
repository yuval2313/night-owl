import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { TokenValidatedUser } from '../interfaces/token-validated-user.interface';
import { Request } from 'express';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AuthService } from '../auth.service';
import { InvalidTokenCredentialsException } from '../errors/invalid-token-credentials.error';
import { TokenTypes } from '../interfaces/token-types.enum';

const configService = new ConfigService();
const secret = configService.get('JWT_ACCESS_SECRET');

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectPinoLogger(AccessTokenStrategy.name)
    private readonly logger: PinoLogger,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
      passReqToCallback: true,
    });
  }

  private extractTokenFromHeader(req: Request): string {
    this.logger.info('Exctracting token from "Authorization" header');
    return req.get('Authorization').replace('Bearer', '').trim();
  }

  authenticate(req: Request, options?: Object): void {
    this.logger.info('Authenticating given access token');
    return super.authenticate(req, options);
  }

  async validate(
    req: Request,
    payload: TokenPayload,
  ): Promise<TokenValidatedUser> {
    this.logger.info('Successfully authenticated access token');

    this.logger.info('Validating token credentials');
    const { sub: userId, username } = payload;

    const accessToken = this.extractTokenFromHeader(req);
    await this.authService.validateToken(
      accessToken,
      payload,
      TokenTypes.ACCESS,
    );

    this.logger.info('Successfully validated token credentials');

    return { userId, username };
  }
}
