import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from '../../profiles/models/profile.entity';

@Entity('followers')
export class Followers {
  @PrimaryColumn()
  follower: number;

  @PrimaryColumn()
  follows: number;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'follower' })
  profile: Profile;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'follows' })
  follows_profile: Profile;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date;
}
