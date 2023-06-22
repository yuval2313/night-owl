import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Profile } from '../../profiles/models/profile.entity';
import { BaseEntity } from '../../models/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('posts')
export class Post extends BaseEntity {
  @ApiProperty({ description: "Profile id of post's creator", example: '1' })
  @Column({ type: 'uuid' })
  profile_id: string;

  @ApiProperty({
    description: "Post's textual content",
    example: 'Tequila shotss!!',
  })
  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
