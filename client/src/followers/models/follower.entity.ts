import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Profile } from '../../profiles/models/profile.entity';
import { BaseEntity } from '../../models/base.entity';

@Entity('followers')
export class Follower extends BaseEntity {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  followed_by_user_id: number;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'user_id' })
  profile: Profile;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'followed_by_user_id' })
  followed_by_profile: Profile;
}
