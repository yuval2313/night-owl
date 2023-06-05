import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from '../../profiles/models/profile.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'author_id' })
  author: number;

  @Column()
  content: string;

  //TODO: Add image property
}
