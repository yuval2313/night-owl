import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { User } from '../../users/models/users.entity';
import { Request } from 'express';
import { LoginDto } from '../req-dtos/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private readonly authService: AuthService) {
    super();
  }

  authenticate(req: Request, options?: Object): void {
    this.logger.log('Validating login request body');
    const loginDto: LoginDto = req.body;

    if (!loginDto.username) {
      const errMsg = 'Validation error - username should not be empty';
      this.logger.error(errMsg);
      throw new BadRequestException(errMsg);
    }
    if (!loginDto.password) {
      const errMsg = 'Validation error - password should not be empty';
      this.logger.error(errMsg);
      throw new BadRequestException(errMsg);
    }

    return super.authenticate(req, options);
  }

  async validate(username: string, password: string): Promise<User> {
    this.logger.log('Successfully validated login request body');
    const user = await this.authService.validateUser({ username, password });

    if (!user) {
      const errMsg = 'Invalid user credentials';
      this.logger.error(errMsg);
      throw new UnauthorizedException(errMsg);
    }

    return user;
  }
}
