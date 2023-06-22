import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../models/base.entity';
import { Profile } from '../../profiles/models/profile.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('businesses')
export class Business extends BaseEntity {
  @ApiProperty({
    description: 'Profile id pertaining to the owner of the business',
    example: 1,
  })
  @Column()
  profile_id: number;

  @ApiProperty({ description: "Business's name", example: 'The Local Inn' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Metadata object containing various properties' })
  @Column({ type: 'jsonb' })
  metadata: Record<string, any>;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
