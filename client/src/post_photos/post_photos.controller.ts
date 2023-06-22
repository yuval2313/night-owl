import { Controller } from '@nestjs/common';
import { PostPhotosService } from './post_photos.service';

@Controller('post-photos')
export class PostPhotosController {
  constructor(private readonly postPhotosService: PostPhotosService) {}
}
