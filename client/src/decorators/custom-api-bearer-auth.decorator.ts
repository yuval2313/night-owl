import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function CApiBearerAuth(name?: string) {
  return applyDecorators(
    ApiBearerAuth(name),
    ApiUnauthorizedResponse({
      description:
        'Unauthorized: Missing auth token / Invalid auth token / Invalid token credentials',
    }),
  );
}
