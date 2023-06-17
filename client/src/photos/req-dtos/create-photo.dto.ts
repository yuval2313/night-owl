import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreatePhotoDto {
  @ApiProperty({
    description: 'Photo URL',
    example:
      'https://images.pexels.com/photos/1850592/pexels-photo-1850592.jpeg?auto=compress&cs=tinysrgb&w=1600',
  })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({ description: 'Metadata object containing various properties' })
  @IsObject()
  metadata: Record<string, any>;
}
