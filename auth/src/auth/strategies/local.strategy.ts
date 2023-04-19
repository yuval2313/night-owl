import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  // FIXME: DTO???
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({ username, password });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
