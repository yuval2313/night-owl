import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { Photo } from './models/photo.entity';

@Module({
  imports: [Photo],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
