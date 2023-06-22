import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Photo } from '../../photos/models/photo.entity';
import { Post } from '../../posts/models/post.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('post_photos')
export class PostPhoto {
  @ApiProperty({ description: 'Photo id', example: '1' })
  @PrimaryColumn({ type: 'uuid' })
  photo_id: string;

  @ApiProperty({ description: 'Post id', example: '111' })
  @PrimaryColumn({ type: 'uuid' })
  post_id: string;

  @ManyToOne(() => Photo)
  @JoinColumn({ name: 'photo_id' })
  photo: Photo;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'post_id' })
  profile: Post;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date;
}
