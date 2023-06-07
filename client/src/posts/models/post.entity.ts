import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from '../../profiles/models/profile.entity';
import { BaseEntity } from '../../models/base.entity';

@Entity('posts')
export class Post extends BaseEntity {
  @Column()
  profile_id: number;

  @Column()
  content: string;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
