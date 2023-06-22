import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/models/users.entity';
import { LoginDto } from './req-dtos/login.dto';
import { TokenResponseDto } from './res-dtos/token-response.dto';
import { TokenPayload } from './interfaces/token-payload.interface';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { TokenTypes } from './interfaces/token-types.enum';
import { CUnauthorizedException } from '../errors/unauthorized.error';

const configService = new ConfigService();
const accessTokenSecret = configService.get('JWT_ACCESS_SECRET');
const refreshTokenSecret = configService.get('JWT_REFRESH_SECRET');

@Injectable()
export class AuthService {
  constructor(
    @InjectPinoLogger(AuthService.name)
    private readonly logger: PinoLogger,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<User | undefined> {
    this.logger.info('Validating user credentials');
    const { username, password } = loginDto;

    const user = await this.usersService.findOneByUsername(username);

    const passwordMatch = await user?.comparePassword(password);
    if (!passwordMatch) return undefined;

    this.logger.info('Successfully validated user credentials');
    return user;
  }

  async validateToken(
    token: string,
    payload: TokenPayload,
    tokenType: TokenTypes,
  ): Promise<void> {
    this.logger.info(`Validating token against user`);
    let valid: boolean;
    let cause: Error;

    try {
      const user = await this.usersService.findOneById(payload.sub);

      if (tokenType === TokenTypes.ACCESS) {
        this.logger.info(`Comparing to user's access token`);
        valid = await user.compareAccessToken(token);
      }
      if (tokenType === TokenTypes.REFRESH) {
        this.logger.info(`Comparing to user's refresh token`);
        valid = await user.compareRefreshToken(token);
      }
    } catch (error) {
      cause = error;
    }

    if (!valid)
      throw new CUnauthorizedException(
        'Invalid token credentials',
        { token, payload },
        { cause },
      );
  }

  async login(user: User): Promise<TokenResponseDto> {
    this.logger.info('Logging user in');

    const tokens = await this.generateTokens(user.id, user.username);
    await this.usersService.updateTokens(user.id, tokens);

    this.logger.info('Logged in successfully');
    return tokens;
  }

  async logout(userId: string): Promise<void> {
    this.logger.info('Logging user out');
    await this.usersService.revokeTokens(userId);
    this.logger.info('Logged out successfully');
  }

  async refreshTokens(
    userId: string,
    username: string,
  ): Promise<TokenResponseDto> {
    this.logger.info('Refreshing user tokens');

    const tokens = await this.generateTokens(userId, username);
    await this.usersService.updateTokens(userId, tokens);

    this.logger.info('Successfully refreshed tokens');
    return tokens;
  }

  private async generateTokens(
    userId: string,
    username: string,
  ): Promise<TokenResponseDto> {
    const payload: TokenPayload = { username, sub: userId };

    this.logger.info('Generating authentication tokens');
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: accessTokenSecret,
        expiresIn: '1h',
      }),
      this.jwtService.signAsync(payload, {
        secret: refreshTokenSecret,
        expiresIn: '7d',
      }),
    ]);

    this.logger.info('Successfully generated authentication tokens');
    return {
      accessToken,
      refreshToken,
    };
  }
}
