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

@Entity('post_photos')
export class PostPhoto {
  @PrimaryColumn()
  photo_id: number;

  @PrimaryColumn()
  post_id: number;

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
