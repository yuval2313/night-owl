import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../models/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('photos')
export class Photo extends BaseEntity {
  @ApiProperty({
    description: 'Photo URL',
    example:
      'https://images.pexels.com/photos/1850592/pexels-photo-1850592.jpeg?auto=compress&cs=tinysrgb&w=1600',
  })
  @Column()
  url: string;

  @ApiProperty({ description: 'Metadata object containing various properties' })
  @Column({ type: 'jsonb' })
  metadata: Record<string, any>;
}
