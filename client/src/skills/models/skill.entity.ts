import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../models/base.entity';
import { Profile } from '../../profiles/models/profile.entity';

@Entity('skills')
export class Skill extends BaseEntity {
  @Column()
  profile_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
