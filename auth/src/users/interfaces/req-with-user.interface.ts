import { TokenValidatedUser } from '../../auth/interfaces/token-validated-user.interface';

export interface RequestWithValidatedUser extends Request {
  user: TokenValidatedUser;
}
