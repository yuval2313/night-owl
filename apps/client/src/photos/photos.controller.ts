import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PhotosService } from './photos.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CApiBearerAuth } from '@app/shared/decorators/custom-api-bearer-auth.decorator';
import { Photo } from './models/photo.entity';
import { CreatePhotoDto } from './req-dtos/create-photo.dto';

@ApiTags('photos')
@CApiBearerAuth()
@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @ApiOperation({
    summary: 'This route creates a new photo entity',
    description:
      'The photo entity consists of a url property along with some metadata',
  })
  @ApiCreatedResponse({
    type: Photo,
    description: 'Successfully created photo entity',
  })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error' })
  @Post()
  createPhoto(@Body() createPhotoDto: CreatePhotoDto): void {}

  @ApiOperation({ summary: 'This route gets a photo entity by id' })
  @ApiParam({ type: String, name: 'photoId', description: 'Photo id' })
  @ApiOkResponse({
    type: Photo,
    description: 'Successfully retrieved photo entity',
  })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error' })
  @ApiNotFoundResponse({ description: 'Not Found: Could not find photo' })
  @Get('/:photoId')
  getPhotoById(@Param('photoId') photoId: string): void {}
}
