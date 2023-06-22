import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({ description: 'Skill name', example: 'Backflips' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Skill description',
    example: 'I can do backflips',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
