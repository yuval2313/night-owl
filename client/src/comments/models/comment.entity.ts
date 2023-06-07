import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../models/base.entity';
import { Profile } from '../../profiles/models/profile.entity';
import { Post } from '../../posts/models/post.entity';

@Entity('comments')
export class Comment extends BaseEntity {
  @Column()
  profile_id: number;

  @Column()
  post_id: number;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column()
  content: string;
}
