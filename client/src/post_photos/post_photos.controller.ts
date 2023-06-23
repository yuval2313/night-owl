import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostPhotosService } from './post_photos.service';
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
import { CreatePostPhotoDto } from './req-dtos/create-post-photo.dto';
import { CApiBearerAuth } from '../decorators/custom-api-bearer-auth.decorator';
import { PostPhoto } from './models/post_photo.entity';

@ApiTags('post_photos')
@CApiBearerAuth()
@Controller('/posts/:postId/photos')
export class PostPhotosController {
  constructor(private readonly postPhotosService: PostPhotosService) {}

  @ApiOperation({
    summary: 'This route uploads a post photo',
    description: 'Creates a post_photo entity to relate a post to a photo',
  })
  @ApiParam({ type: String, name: 'postId', description: 'Post id' })
  @ApiCreatedResponse({
    type: PostPhoto,
    description: 'Successfully uploaded post photo',
  })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Not authorized to perform this action',
  })
  @ApiNotFoundResponse({ description: 'Not Found: Could not find post' })
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
  @ApiForbiddenResponse({
    description: 'Forbidden: Not authorized to perform this action',
  })
  @ApiNotFoundResponse({
    description: 'Not Found: Could not find post photo',
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
  @ApiNotFoundResponse({ description: 'Not Found: Could not find post photos' })
  @Get()
  getPostPhotos(@Param('postId') postId: string): void {}

  @ApiOperation({ summary: "This route gets a post's photo by id" })
  @ApiParam({ type: String, name: 'postId', description: 'Post id' })
  @ApiParam({ type: String, name: 'photoId', description: 'Photo id' })
  @ApiOkResponse({
    type: PostPhoto,
    description: 'Successfully retrieved photo',
  })
  @ApiNotFoundResponse({ description: 'Not Found: Could not find post photo' })
  @Get('/:photoId')
  getPostPhotoById(
    @Param('postId') postId: string,
    @Param('photoId') photoId: string,
  ): void {}
}
