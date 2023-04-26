import { User } from '../../users/models/users.entity';

export interface RegistrationResponse {
  user: User;
  access_token: string;
}
