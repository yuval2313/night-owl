import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { TokenResponseDto } from './res-dtos/token-response.dto';
import { RequestWithUser } from './interfaces/req-with-user.interface';
import { AccessTokenAuthGuard } from './guards/access-token-auth.guard';
import { RequestWithValidatedUser } from '../users/interfaces/req-with-user.interface';
import { RefreshTokenAuthGuard } from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: RequestWithUser): Promise<TokenResponseDto> {
    return this.authService.login(req.user);
  }

  @UseGuards(AccessTokenAuthGuard)
  @Post('logout')
  logout(@Request() req: RequestWithValidatedUser): Promise<void> {
    return this.authService.logout(req.user.userId);
  }

  @UseGuards(RefreshTokenAuthGuard)
  @Post('refresh')
  refreshTokens(
    @Request() req: RequestWithValidatedUser,
  ): Promise<TokenResponseDto> {
    const { userId, username } = req.user;
    return this.authService.refreshTokens(userId, username);
  }
}
