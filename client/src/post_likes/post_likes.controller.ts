import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostLikesService } from './post_likes.service';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CApiBearerAuth } from '../decorators/custom-api-bearer-auth.decorator';
import { PostLike } from './models/post_like.entity';

@ApiTags('post_likes')
@CApiBearerAuth()
@Controller('posts/:postId')
export class PostLikesController {
  constructor(private readonly postLikesService: PostLikesService) {}

  @ApiOperation({ summary: 'This route likes a post' })
  @ApiParam({ type: String, name: 'postId', description: 'Post id' })
  @ApiCreatedResponse({
    type: PostLike,
    description: 'Successfully liked a post',
  })
  @ApiNotFoundResponse({ description: 'Not Found: Could not find post' })
  @Post('like')
  likePost(@Param('postId') postId: string): void {}

  @ApiOperation({
    summary: 'This route unlikes a post',
    description: 'Soft deletes a post_like entity',
  })
  @ApiParam({ type: String, name: 'postId', description: 'Post id' })
  @ApiOkResponse({ type: PostLike, description: 'Successfully unliked a post' })
  @ApiNotFoundResponse({
    description: 'Not Found: Could not find post',
  })
  @Delete('unlike')
  unlikePost(@Param('postId') postId: string): void {}

  @ApiOperation({ summary: "This route gets a post's likes" })
  @ApiParam({ type: String, name: 'postId', description: 'Post id' })
  @ApiOkResponse({
    type: [PostLike],
    description: 'Successfully retrieved post likes',
  })
  @ApiNotFoundResponse({ description: 'Not Found: Could not find post' })
  @Get('likes')
  getPostLikes(@Param('postId') postId: string): void {}
}
