import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: "Post's textual content",
    example: 'Tequila shotss!!',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
