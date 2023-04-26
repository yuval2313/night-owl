import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { User } from '../../users/models/users.entity';
import { Request } from 'express';
import { LoginDto } from '../req-dtos/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  authenticate(req: Request, options?: Object): void {
    const loginDto: LoginDto = req.body;

    if (!loginDto.username)
      throw new BadRequestException('username should not be empty');
    if (!loginDto.password)
      throw new BadRequestException('password should not be empty');

    return super.authenticate(req, options);
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser({ username, password });

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return user;
  }
}
