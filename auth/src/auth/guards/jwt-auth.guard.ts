import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';
import { TokenValidatedUser } from '../interfaces/token-validated-user.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(
    err: Error,
    user: TokenValidatedUser,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (info instanceof JsonWebTokenError)
      throw new UnauthorizedException('Invalid Token');
    if (info instanceof Error && info.message === 'No auth token')
      throw new UnauthorizedException(info.message);

    return super.handleRequest(err, user, info, context, status);
  }
}
