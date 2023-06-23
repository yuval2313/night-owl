import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FollowsService } from './follows.service';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CApiBearerAuth } from '../decorators/custom-api-bearer-auth.decorator';
import { Follow } from './models/follow.entity';

@ApiTags('follows')
@CApiBearerAuth()
@Controller('profiles/:profileId')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  // follow
  @ApiOperation({
    summary: 'This route creates a new follow',
    description: "The authenticated user's profile follows a given profile",
  })
  @ApiParam({ type: String, name: 'profileId', description: 'Profile id' })
  @ApiCreatedResponse({
    type: Follow,
    description: 'Successfully created follow entity',
  })
  @ApiNotFoundResponse({
    description: 'Not Found: Could not find given profile',
  })
  @Post('follow')
  follow(@Param('profileId') profileId: string): void {}

  // unfollow
  @ApiOperation({
    summary: 'This route unfollows a profile',
    description: 'Performs a soft delete on a follow entity',
  })
  @ApiParam({ type: String, name: 'profileId', description: 'Profile id' })
  @ApiOkResponse({
    type: Follow,
    description: 'Successfully performed soft deletion on follow',
  })
  @ApiNotFoundResponse({
    description: 'Not Found: Could not find profile',
  })
  @Delete('unfollow')
  unfollow(@Param('profileId') profileId: string): void {}

  // getFollowers
  @ApiOperation({
    summary: 'This route returns all followers of a given profile',
  })
  @ApiParam({ type: String, name: 'profileId', description: 'Profile id' })
  @ApiOkResponse({
    type: [Follow],
    description: 'Successfully retrieved all followers',
  })
  @ApiNotFoundResponse({
    description: 'Could not find any followers',
  })
  @Get('/followers')
  getFollowers(@Param('profileId') profileId: string): void {}

  // getFollows
  @ApiOperation({
    summary: 'This route returns all the follows of a given profile',
  })
  @ApiParam({ type: String, name: 'profileId', description: 'Profile id' })
  @ApiOkResponse({
    type: [Follow],
    description: 'Successfully retrieved all follows',
  })
  @ApiNotFoundResponse({
    description: 'Could not find any follows',
  })
  @Get('/follows')
  getFollows(@Param('profileId') profileId: string): void {}

  // getFollowerById
  @ApiOperation({
    summary: 'This route returns a single follower of a given profile',
  })
  @ApiParam({ type: String, name: 'profileId', description: 'Profile id' })
  @ApiParam({
    type: String,
    name: 'followerProfileId',
    description: 'Follower profile id',
  })
  @ApiOkResponse({
    type: Follow,
    description: 'Successfully retrieved follower',
  })
  @ApiNotFoundResponse({
    description: 'Could not find follower',
  })
  @Get('/followers/:followerProfileId')
  getFollowerById(
    @Param('profileId') profileId: string,
    @Param('followerProfileId') followerProfileId: string,
  ): void {}

  // getFollowById
  @ApiOperation({
    summary: 'This route returns a single follow of a given profile',
  })
  @ApiParam({ type: String, name: 'profileId', description: 'Profile id' })
  @ApiParam({
    type: String,
    name: 'followedProfileId',
    description: 'Followed profile id',
  })
  @ApiOkResponse({
    type: Follow,
    description: 'Successfully retrieved follow',
  })
  @ApiNotFoundResponse({
    description: 'Could not find follow',
  })
  @Get('/follows/:followedProfileId')
  getFollowById(
    @Param('profileId') profileId: string,
    @Param('followedProfileId') followedProfileId: string,
  ): void {}
}
