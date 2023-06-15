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
import { CApiBearerAuth } from '../decorators/custom-api-bearer-auth.decorator';
import { FollowDto } from './req-dtos/follow.dto';
import { Follow } from './models/follow.entity';

@ApiTags('follows')
@CApiBearerAuth()
@Controller()
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  // follow
  @ApiOperation({
    summary: 'This route creates a new follow',
    description:
      'The given profile id serves as the follower while the followed profile is indicated by the DTO',
  })
  @ApiCreatedResponse({
    type: Follow,
    description: 'Successfully created follow entity',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiConflictResponse({
    description: 'Conflict: Already following profile',
  })
  @Post('follow')
  follow(@Body() followDto: FollowDto): void {}

  // unfollow
  @ApiOperation({
    summary: 'This route unfollows a profile',
    description: 'Performs a soft delete on a follow entity',
  })
  @ApiParam({
    type: String,
    name: 'followedProfileId',
    description: 'Followed profile id',
  })
  @ApiOkResponse({
    type: Follow,
    description: 'Successfully performed soft deletion on follow',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiNotFoundResponse({
    description: 'Not Found: Could not find follow',
  })
  @Delete('unfollow/:followedProfileId')
  unfollow(@Param('followedProfileId') followedProfileId: string): void {}

  // refollow
  @ApiOperation({
    summary: 'This route refollows an unfollowed profile',
    description: 'Removes a soft delete from a follow entity',
  })
  @ApiParam({
    type: String,
    name: 'unfollowedProfileId',
    description: 'Unfollowed profile id',
  })
  @ApiOkResponse({
    type: Follow,
    description: 'Successfully performed refollow',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiNotFoundResponse({
    description: 'Not Found: Could not find soft deleted follow',
  })
  @Patch('refollow/:unfollowedProfileId')
  refollow(@Param('unfollowedProfileId') unfollowedProfileId: string): void {}

  // getFollowers
  @ApiOperation({
    summary: "This route returns all follows following user's profile",
  })
  @ApiParam({ type: String, name: 'profileId', description: 'Profile id' })
  @ApiOkResponse({
    type: [Follow],
    description: "Successfully retrieved all follows following user's profile",
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiNotFoundResponse({
    description: "Could not find any followers for user's profile",
  })
  @Get('/followers/:profileId')
  getFollowers(@Param('profileId') profileId: string): void {}

  // getFollows
  @ApiOperation({
    summary: "This route returns all follows followed by user's profile",
  })
  @ApiParam({ type: String, name: 'profileId', description: 'Profile id' })
  @ApiOkResponse({
    type: [Follow],
    description:
      "Successfully retrieved all follows followed by user's profile",
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiNotFoundResponse({
    description: "Could not find any follows for user's profile",
  })
  @Get('/follows/:profileId')
  getFollows(@Param('profileId') profileId: string): void {}

  // getFollowerById
  @ApiOperation({
    summary: "This route returns a single follow following user's profile",
  })
  @ApiParam({ type: String, name: 'profileId', description: 'Profile id' })
  @ApiParam({
    type: String,
    name: 'followerProfileId',
    description: 'Follower profile id',
  })
  @ApiOkResponse({
    type: Follow,
    description: "Successfully retrieved follow following user's profile",
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiNotFoundResponse({
    description: "Could not find follower of user's profile",
  })
  @Get('/followers/:profileId/:followerProfileId')
  getFollowerById(
    @Param('profileId') profileId: string,
    @Param('followerProfileId') followerProfileId: string,
  ): void {}

  // getFollowById
  @ApiOperation({
    summary: "This route returns a single follow followed by user's profile",
  })
  @ApiParam({ type: String, name: 'profileId', description: 'Profile id' })
  @ApiParam({
    type: String,
    name: 'followedProfileId',
    description: 'Followed profile id',
  })
  @ApiOkResponse({
    type: Follow,
    description: "Successfully retrieved follow followed by user's profile",
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiNotFoundResponse({
    description: "Could not find follow of user's profile",
  })
  @Get('/follows/:profileId/:followedProfileId')
  getFollowById(
    @Param('profileId') profileId: string,
    @Param('followedProfileId') followedProfileId: string,
  ): void {}
}
