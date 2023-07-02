import { Request } from 'express';
import { User } from '../../users/models/users.entity';

export interface RequestWithUser extends Request {
  user: User;
}
