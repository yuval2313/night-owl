import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
<<<<<<< Updated upstream
import { BaseEntity } from '../../models/base.entity';
import { Profile } from '../../profiles/models/profile.entity';
import { Post } from '../../posts/models/post.entity';
=======
import { BaseEntity } from '@app/shared/models/base.entity';
import { Profile } from '../../../profiles/models/profile.entity';
import { Post } from '../../models/post.entity';
>>>>>>> Stashed changes
import { ApiProperty } from '@nestjs/swagger';

@Entity('comments')
export class Comment extends BaseEntity {
  @ApiProperty({
    description: 'Profile id of one who made the comment',
    example: 1,
  })
  @Column()
  profile_id: number;

  @ApiProperty({
    description: 'Post id of post which was commented on',
    example: 111,
  })
  @Column()
  post_id: number;

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
