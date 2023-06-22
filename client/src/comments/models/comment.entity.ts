import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../models/base.entity';
import { Profile } from '../../profiles/models/profile.entity';
import { Post } from '../../posts/models/post.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('comments')
export class Comment extends BaseEntity {
  @ApiProperty({
    description: 'Profile id of one who made the comment',
    example: '1',
  })
  @Column({ type: 'uuid' })
  profile_id: string;

  @ApiProperty({
    description: 'Post id of post which was commented on',
    example: '111',
  })
  @Column({ type: 'uuid' })
  post_id: string;

  @ApiProperty({
    description: "Comment's textual content",
    example: 'This post sucks.',
  })
  @Column()
  content: string;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
