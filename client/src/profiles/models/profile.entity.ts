import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../models/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('profiles')
export class Profile extends BaseEntity {
  @ApiProperty({ description: 'User id', example: '1' })
  @Column({ type: 'uuid' })
  user_id: string;

  @ApiProperty({ description: 'Full name', example: 'Tom Cruise' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Profile picture URL' })
  @Column()
  photo_url: string;

  @ApiProperty({
    description: 'Metadata object containing various properties',
    example: { facts: 'Nothing is impossible' },
  })
  @Column({ type: 'jsonb' })
  metadata: Record<string, any>;
}
