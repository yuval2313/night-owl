import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../models/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('profiles')
export class Profile extends BaseEntity {
  @ApiProperty({ description: 'User id', example: 1 })
  @Column()
  user_id: number;

  @ApiProperty({ description: 'First name', example: 'Tom' })
  @Column()
  first_name: string;

  @ApiProperty({ description: 'Last name', example: 'Cruise' })
  @Column()
  last_name: string;

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
