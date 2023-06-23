import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PhotosService } from './photos.service';
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
import { CApiBearerAuth } from '../decorators/custom-api-bearer-auth.decorator';
import { Photo } from './models/photo.entity';
import { CreatePhotoDto } from './req-dtos/create-photo.dto';

@ApiTags('photos')
@CApiBearerAuth()
@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @ApiOperation({ summary: 'This route creates a new photo' })
  @ApiCreatedResponse({
    type: Photo,
    description: 'Successfully created photo',
  })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error' })
  @Post()
  createPhoto(@Body() createPhotoDto: CreatePhotoDto): void {}

  @ApiOperation({ summary: 'This route deletes a photo' })
  @ApiParam({ type: String, name: 'photoId', description: 'Photo id' })
  @ApiOkResponse({
    type: Photo,
    description: 'Successfully removed photo',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Not authorized to perform this action',
  })
  @ApiNotFoundResponse({ description: 'Not Found: Could not find photo' })
  @Delete('/:photoId')
  removePhoto(@Param('photoId') photoId: string): void {}

  @ApiOperation({ summary: 'This route gets a photo by id' })
  @ApiParam({ type: String, name: 'photoId', description: 'Photo id' })
  @ApiOkResponse({
    type: Photo,
    description: 'Successfully retrieved photo',
  })
  @ApiNotFoundResponse({ description: 'Not Found: Could not find photo' })
  @Get('/:photoId')
  getPhotoById(@Param('photoId') photoId: string): void {}
}
