import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from '../../comments/models/comment.entity';
import { Profile } from '../../profiles/models/profile.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('comment_likes')
export class CommentLike {
  @ApiProperty({ description: 'Liked comment id', example: 111 })
  @PrimaryColumn()
  comment_id: number;

  @ApiProperty({
    description: 'Profile id of the one performing a like',
    example: 1,
  })
  @PrimaryColumn()
  profile_id: number;

  @ManyToOne(() => Comment)
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;

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
