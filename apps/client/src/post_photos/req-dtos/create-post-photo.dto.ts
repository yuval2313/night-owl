import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreatePostPhotoDto {
  @ApiProperty({ description: 'Photo id', example: 1, minimum: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  photo_id: number;
}
