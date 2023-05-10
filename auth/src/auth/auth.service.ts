import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/models/users.entity';
import { LoginDto } from './req-dtos/login.dto';
import { TokenResponseDto } from './res-dtos/token-response.dto';
import { TokenPayload } from './interfaces/token-payload.interface';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

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

  async login(user: User): Promise<TokenResponseDto> {
    this.logger.info({ user }, 'Logging user in');

    const payload: TokenPayload = { username: user.username, sub: user.id };
    const access_token = await this.jwtService.signAsync(payload);

    this.logger.info('Successfully created JWT');
    return {
      access_token,
    };
  }
}
