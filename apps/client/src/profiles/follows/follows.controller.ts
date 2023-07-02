import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FollowsService } from './follows.service';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
<<<<<<< Updated upstream
import { CApiBearerAuth } from '../decorators/custom-api-bearer-auth.decorator';
=======
import { CApiBearerAuth } from '@app/shared/decorators/custom-api-bearer-auth.decorator';
>>>>>>> Stashed changes
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
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiNotFoundResponse({
    description: 'Not Found: Could not find given profile',
  })
  @ApiConflictResponse({
    description: 'Conflict: Already following profile',
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
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiNotFoundResponse({
    description: 'Not Found: Could not find profile / follow',
  })
  @Delete('unfollow')
  unfollow(@Param('profileId') profileId: string): void {}

  // refollow
  @ApiOperation({
    summary: 'This route refollows an unfollowed profile',
    description: 'Removes a soft delete from a follow entity',
  })
  @ApiParam({ type: String, name: 'profileId', description: 'Profile id' })
  @ApiOkResponse({
    type: Follow,
    description: 'Successfully performed refollow',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiNotFoundResponse({
    description: 'Not Found: Could not find profile / soft deleted follow',
  })
  @Patch('refollow')
  refollow(@Param('profileId') profileId: string): void {}

  // getFollowers
  @ApiOperation({
    summary: 'This route returns all followers of a given profile',
  })
  @ApiParam({ type: String, name: 'profileId', description: 'Profile id' })
  @ApiOkResponse({
    type: [Follow],
    description: 'Successfully retrieved all followers',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiNotFoundResponse({
    description: 'Could not find profile / any followers',
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
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiNotFoundResponse({
    description: 'Could not find profile / any follows',
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
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiNotFoundResponse({
    description: 'Could not find profile / follower',
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
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiNotFoundResponse({
    description: 'Could not find profile / follow',
  })
  @Get('/follows/:followedProfileId')
  getFollowById(
    @Param('profileId') profileId: string,
    @Param('followedProfileId') followedProfileId: string,
  ): void {}
}
