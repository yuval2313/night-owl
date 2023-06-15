import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: "Post's textual content",
    example: 'Tequila shotss!!',
  })
  content: string;
}
