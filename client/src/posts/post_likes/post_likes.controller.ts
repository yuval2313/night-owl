import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PostLikesService } from './post_likes.service';
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
import { CApiBearerAuth } from '../../decorators/custom-api-bearer-auth.decorator';
import { PostLike } from './models/post_like.entity';

@ApiTags('post_likes')
@CApiBearerAuth()
@Controller()
export class PostLikesController {
  constructor(private readonly postLikesService: PostLikesService) {}

  @ApiOperation({ summary: 'This route likes a post' })
  @ApiParam({ type: String, name: 'postId', description: 'Post id' })
  @ApiCreatedResponse({
    type: PostLike,
    description: 'Successfully liked a post',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiNotFoundResponse({ description: 'Not Found: Could not find post' })
  @ApiConflictResponse({ description: 'Conflict: Post has already been liked' })
  @Post('like')
  likePost(@Param('postId') postId: string): void {}

  @ApiOperation({
    summary: 'This route unlikes a post',
    description: 'Soft deletes a post_like entity',
  })
  @ApiParam({ type: String, name: 'postId', description: 'Post id' })
  @ApiOkResponse({ type: PostLike, description: 'Successfully unliked a post' })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiNotFoundResponse({
    description: 'Not Found: Could not find post / post like',
  })
  @Delete('unlike')
  unlikePost(@Param('postId') postId: string): void {}

  @ApiOperation({
    summary: 'This route relikes a post',
    description: 'Removes soft delete from a post_like entity',
  })
  @ApiParam({ type: String, name: 'postId', description: 'Post id' })
  @ApiOkResponse({ type: PostLike, description: 'Successfully reliked a post' })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiNotFoundResponse({
    description: 'Not Found: Could not find post / soft deleted post like',
  })
  @Patch('relike')
  relikePost(@Param('postId') postId: string): void {}

  @ApiOperation({ summary: "This route gets a post's likes" })
  @ApiParam({ type: String, name: 'postId', description: 'Post id' })
  @ApiOkResponse({
    type: [PostLike],
    description: 'Successfully retrieved post likes',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiNotFoundResponse({
    description: 'Not Found: Could not find post / post likes',
  })
  @Get('likes')
  getPostLikes(@Param('postId') postId: string): void {}
}
