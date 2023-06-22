import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto {
  @ApiProperty({ description: 'generated access token' })
  accessToken: string;

  @ApiProperty({ description: 'generated refresh token' })
  refreshToken: string;
}
