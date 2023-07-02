import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostPhotosService } from './post_photos.service';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePostPhotoDto } from './req-dtos/create-post-photo.dto';
<<<<<<< Updated upstream
import { CApiBearerAuth } from '../decorators/custom-api-bearer-auth.decorator';
=======
import { CApiBearerAuth } from '@app/shared/decorators/custom-api-bearer-auth.decorator';
>>>>>>> Stashed changes
import { PostPhoto } from './models/post_photo.entity';

@ApiTags('post_photos')
@CApiBearerAuth()
@Controller('/posts/:postId/photos')
export class PostPhotosController {
  constructor(private readonly postPhotosService: PostPhotosService) {}

  @ApiOperation({
    summary: 'This route uploads a post photo',
    description:
      'Creates a post_photo entity to relate a post to a photo, post is provided via route parameter',
  })
  @ApiParam({ type: String, name: 'postId', description: 'Post id' })
  @ApiCreatedResponse({
    type: PostPhoto,
    description: 'Successfully uploaded post photo',
  })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Only owner can perform this action',
  })
  @ApiNotFoundResponse({ description: 'Not Found: Could not find post' })
  @ApiConflictResponse({
    description: 'Conflict: Post is already associated with given photo id',
  })
  @Post()
  uploadPostPhoto(
    @Param('postId') postId: string,
    @Body() createPostPhotoDto: CreatePostPhotoDto,
  ): void {}

  @ApiOperation({
    summary: "This route removes a post's photo",
    description: 'Performs a soft delete on a post_photo entity',
  })
  @ApiParam({ type: String, name: 'postId', description: 'Post id' })
  @ApiParam({ type: String, name: 'photoId', description: 'Photo id' })
  @ApiOkResponse({ type: PostPhoto, description: 'Successfully removed photo' })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Only owner can perform this action',
  })
  @ApiNotFoundResponse({
    description: 'Not Found: Could not find post / photo',
  })
  @Delete('/:photoId')
  removePostPhoto(
    @Param('postId') postId: string,
    @Param('photoId') photoId: string,
  ): void {}

  @ApiOperation({ summary: "This route gets a post's photos" })
  @ApiParam({ type: String, name: 'postId', description: 'Post id' })
  @ApiOkResponse({
    type: [PostPhoto],
    description: 'Successfully retrieved post photos',
  })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error' })
  @ApiNotFoundResponse({
    description: 'Not Found: Could not find post / photos',
  })
  @Get()
  getPostPhotos(@Param('postId') postId: string): void {}

  @ApiOperation({ summary: "This route gets a post's photo by id" })
  @ApiParam({ type: String, name: 'postId', description: 'Post id' })
  @ApiParam({ type: String, name: 'photoId', description: 'Photo id' })
  @ApiOkResponse({
    type: PostPhoto,
    description: 'Successfully retrieved photo',
  })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error' })
  @ApiNotFoundResponse({
    description: 'Not Found: Could not find post / photo',
  })
  @Get('/:photoId')
  getPostPhotoById(
    @Param('postId') postId: string,
    @Param('photoId') photoId: string,
  ): void {}
}
