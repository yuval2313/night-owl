import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: "Comment's textual content",
    example: 'This post sucks.',
    minLength: 1,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  content: string;
}
