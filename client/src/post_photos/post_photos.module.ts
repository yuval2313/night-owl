import { Module } from '@nestjs/common';
import { PostPhotosService } from './post_photos.service';
import { PostPhotosController } from './post_photos.controller';
import { PostPhoto } from './models/post_photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PostPhoto])],
  controllers: [PostPhotosController],
  providers: [PostPhotosService],
})
export class PostPhotosModule {}
