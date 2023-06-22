import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateBusinessDto {
  @ApiProperty({ description: "Business's name", example: 'The Local Inn' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Metadata object containing various properties',
  })
  @IsObject()
  metadata: Record<string, any>;
}
