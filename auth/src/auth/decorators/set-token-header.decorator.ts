import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { SetTokenHeader as SetToken } from '../interfaces/set-token-header.interface';
import { Response } from 'express';

export const SetTokenHeader = createParamDecorator(
  (_data, context: ExecutionContext): SetToken => {
    const res = context.switchToHttp().getResponse<Response>();

    return (access_token: string): void => {
      res.setHeader('x-access-token', access_token);
    };
  },
);
