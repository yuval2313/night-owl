import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../models/base.entity';
import { Profile } from '../../profiles/models/profile.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('skills')
export class Skill extends BaseEntity {
  @ApiProperty({ description: 'Profile id', example: 1 })
  @Column()
  profile_id: number;

  @ApiProperty({ description: 'Skill name', example: 'Backflips' })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Skill description',
    example: 'I can do backflips',
  })
  @Column()
  description: string;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
