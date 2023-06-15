import { ApiProperty } from '@nestjs/swagger';

export class FollowDto {
  @ApiProperty({ description: 'Profile id of one being followed', example: 2 })
  followed: number;
}
