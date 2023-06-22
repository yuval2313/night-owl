import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({
    description: 'First name',
    minLength: 3,
    maxLength: 50,
    example: 'Steven',
  })
  @MinLength(3)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    description: 'Last name',
    minLength: 3,
    maxLength: 50,
    example: 'Seagal',
  })
  @MinLength(3)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ description: 'Profile photo URL' })
  @IsString()
  @IsNotEmpty()
  photo_url: string;

  @ApiProperty({
    description: 'Optional metadata object containing various properties',
    example: { facts: 'I know aikido' },
    required: false,
  })
  @IsObject()
  metadata: Record<string, any>;
}
