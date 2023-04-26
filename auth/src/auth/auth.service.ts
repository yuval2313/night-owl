import { Injectable, Logger } from '@nestjs/common';
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
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<RegistrationResponse> {
    this.logger.log('Registering user');
    const user = await this.usersService.createUser(createUserDto);
    const { access_token } = await this.login(user);

    this.logger.log('Successfully registered user');
    return { user, access_token };
  }

  async validateUser(loginDto: LoginDto): Promise<User> {
    this.logger.log('Validating user credentials');
    const { username, password } = loginDto;

    const user = await this.usersService.findOneByUsername(username);

    const passwordMatch = await user?.comparePassword(password);
    if (!passwordMatch) return undefined;

    this.logger.log('Successfully validated user credentials');
    return user;
  }

  async login(user: User): Promise<TokenResponseDto> {
    this.logger.log('Logging user in');

    const payload: TokenPayload = { username: user.username, sub: user.id };
    const access_token = await this.jwtService.signAsync(payload);

    this.logger.log('Successfully created JWT');
    return {
      access_token,
    };
  }
}
