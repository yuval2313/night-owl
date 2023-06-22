import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'Yuval' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'C0mplexP@ssword' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
