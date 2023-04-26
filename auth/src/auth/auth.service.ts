import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/models/users.entity';
import { LoginDto } from './req-dtos/login.dto';
import { CreateUserDto } from './req-dtos/create-user.dto';
import { TokenResponseDto } from './res-dtos/token-response.dto';
import { TokenPayload } from './interfaces/token-payload.interface';
import { RegistrationResponse } from './interfaces/registration-result.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<RegistrationResponse> {
    const user = await this.usersService.createUser(createUserDto);
    const { access_token } = await this.login(user);
    return { user, access_token };
  }

  async validateUser(loginDto: LoginDto): Promise<User> {
    const { username, password } = loginDto;

    const user = await this.usersService.findOneByUsername(username);

    const passwordMatch = await user?.comparePassword(password);
    if (!passwordMatch) return undefined;

    return user;
  }

  async login(user: User): Promise<TokenResponseDto> {
    const payload: TokenPayload = { username: user.username, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
