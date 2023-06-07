import { Module } from '@nestjs/common';
import { PostPhotosService } from './post_photos.service';
import { PostPhotosController } from './post_photos.controller';
import { PostPhoto } from './models/post_photo.entity';

@Module({
  imports: [PostPhoto],
  controllers: [PostPhotosController],
  providers: [PostPhotosService],
})
export class PostPhotosModule {}
