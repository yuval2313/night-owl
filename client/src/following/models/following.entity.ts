import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../../models/base.entity';
import { Profile } from '../../profiles/models/profile.entity';

@Entity()
export class Following extends BaseEntity {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  follows_user_id: number;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'user_id' })
  profile: Profile;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'follows_user_id' })
  follows_profile: Profile;
}
