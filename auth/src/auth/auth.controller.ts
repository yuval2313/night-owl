import {
  Controller,
  Post,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { TokenResponseDto } from './res-dtos/token-response.dto';
import { RequestWithUser } from './interfaces/req-with-user.interface';
import { AccessTokenAuthGuard } from './guards/access-token-auth.guard';
import { RequestWithValidatedUser } from '../users/interfaces/req-with-user.interface';
import { RefreshTokenAuthGuard } from './guards/refresh-token.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './req-dtos/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({
    type: TokenResponseDto,
    description:
      'Successfully logged user in and generated authentication tokens',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: RequestWithUser): Promise<TokenResponseDto> {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth('access')
  @ApiNoContentResponse({ description: 'Successfully logged out user' })
  @UseGuards(AccessTokenAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Request() req: RequestWithValidatedUser): Promise<void> {
    return this.authService.logout(req.user.userId);
  }

  @ApiBearerAuth('refresh')
  @ApiCreatedResponse({
    type: TokenResponseDto,
    description: 'Successfully refreshed user tokens',
  })
  @UseGuards(RefreshTokenAuthGuard)
  @Post('refresh')
  refreshTokens(
    @Request() req: RequestWithValidatedUser,
  ): Promise<TokenResponseDto> {
    const { userId, username } = req.user;
    return this.authService.refreshTokens(userId, username);
  }
}
