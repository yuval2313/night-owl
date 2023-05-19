import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';
import { User } from '../../users/models/users.entity';
import { Request } from 'express';
import { LoginDto } from '../req-dtos/login.dto';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CUnauthorizedException } from '../../errors/unauthorized.error';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectPinoLogger(LocalStrategy.name)
    private readonly logger: PinoLogger,
    private readonly authService: AuthService,
  ) {
    super();
  }

  authenticate(req: Request, options?: Object): void {
    this.logger.info('Validating login request body');
    const loginDto: LoginDto = req.body;

    if (!loginDto.username || !loginDto.password) {
      const message = [];

      if (!loginDto.username) message.push('username is a required field');
      if (!loginDto.password) message.push('password is a required field');

      throw new BadRequestException(message);
    }

    super.authenticate(req, options);
  }

  async validate(username: string, password: string): Promise<User> {
    this.logger.info('Successfully validated login request body');
    const user = await this.authService.validateUser({ username, password });

    if (!user)
      throw new CUnauthorizedException('Invalid user credentials', {
        username,
      });

    return user;
  }
}
