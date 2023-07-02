import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './models/post.entity';
import { CApiBearerAuth } from '@app/shared/decorators/custom-api-bearer-auth.decorator';
import { CreatePostDto } from './req-dtos/create-post.dto';
import { UpdatePostDto } from './req-dtos/update-post.dto';

@ApiTags('posts')
@CApiBearerAuth()
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'This route creates a post' })
  @ApiCreatedResponse({
    type: PostEntity,
    description: 'Successfully created post',
  })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error' })
  @Post()
  createPost(@Body() createPostDto: CreatePostDto): void {}

  @ApiOperation({ summary: 'This route updates a post' })
  @ApiParam({
    type: String,
    name: 'postId',
    description: 'Post id',
  })
  @ApiOkResponse({
    type: PostEntity,
    description: 'This route updates a post by id',
  })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Only owner can perform this action',
  })
  @ApiNotFoundResponse({
    description: "Not Found: Could not find profile's post",
  })
  @Patch('/:postId')
  updatePost(
    @Body() updatePostDto: UpdatePostDto,
    @Param('postId') postId: string,
  ): void {}

  @ApiOperation({
    summary: 'This route removes a post',
    description: 'Performs a soft delete on a post entity',
  })
  @ApiParam({
    type: String,
    name: 'postId',
    description: 'Post id',
  })
  @ApiOkResponse({ type: PostEntity, description: 'Successfully removed post' })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Only owner can perform this action',
  })
  @ApiNotFoundResponse({
    description: "Not Found: Could not find profile's post",
  })
  @Delete('/:postId')
  removePost(@Param('postId') postId: string): void {}

  @ApiOperation({
    summary: 'This route gets all the posts from a given profile',
  })
  @ApiParam({
    type: String,
    name: 'profileId',
    description: 'Profile id',
  })
  @ApiOkResponse({
    type: [PostEntity],
    description: "Successfully retrieved given profile's posts",
  })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error' })
  @ApiNotFoundResponse({
    description: "Not Found: Could not find profile's posts",
  })
  @Get('/:profileId')
  getPosts(@Param('profileId') profileId: string): void {}

  @ApiOperation({
    summary: 'This route gets a post from a given profile by id',
  })
  @ApiParam({
    type: String,
    name: 'profileId',
    description: 'Profile id',
  })
  @ApiParam({
    type: String,
    name: 'postId',
    description: 'Post id',
  })
  @ApiOkResponse({
    type: PostEntity,
    description: "Successfully retrieved given profile's post",
  })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error' })
  @ApiNotFoundResponse({
    description: "Not Found: Could not find profile's post",
  })
  @Get('/:profileId/:postId')
  getPostById(
    @Param('profileId') profileId: string,
    @Param('postId') postId: string,
  ): void {}
}
