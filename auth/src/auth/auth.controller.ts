import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { TokenResponseDto } from './res-dtos/token-response.dto';
import { RequestWithUser } from './interfaces/req-with-user.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: RequestWithUser): Promise<TokenResponseDto> {
    return this.authService.login(req.user);
  }
}
