import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from './req-dtos/create-user.dto';
import { User } from '../users/models/users.entity';
import { TokenResponseDto } from './res-dtos/token-response.dto';
import { SetTokenHeader } from './decorators/set-token-header.decorator';
import { SetTokenHeader as SetToken } from './interfaces/set-token-header.interface';
import { RequestWithUser } from './interfaces/req-with-user.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @SetTokenHeader() setToken: SetToken,
  ): Promise<User> {
    const { user, access_token } = await this.authService.register(
      createUserDto,
    );
    setToken(access_token);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: RequestWithUser): Promise<TokenResponseDto> {
    return this.authService.login(req.user);
  }
}
