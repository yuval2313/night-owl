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
import { ApiProperty } from '@nestjs/swagger';

@Entity('follows')
export class Follow {
  @ApiProperty({
    description: 'Profile id of the user doing the following',
    example: 1,
  })
  @PrimaryColumn()
  follower: number;

  @ApiProperty({
    description: 'Profile id of the user being followed',
    example: 2,
  })
  @PrimaryColumn()
  followed: number;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'follower' })
  follower_profile: Profile;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'followed' })
  followed_profile: Profile;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date;
}
