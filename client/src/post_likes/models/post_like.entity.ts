import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '../../posts/models/post.entity';
import { Profile } from '../../profiles/models/profile.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('post_likes')
export class PostLike {
  @ApiProperty({ description: 'Liked post id', example: '111' })
  @PrimaryColumn({ type: 'uuid' })
  post_id: string;

  @ApiProperty({
    description: 'Profile id who performed the like',
    example: '1',
  })
  @PrimaryColumn({ type: 'uuid' })
  profile_id: string;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date;
}
