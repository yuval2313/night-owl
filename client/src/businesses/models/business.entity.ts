import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../models/base.entity';
import { Profile } from '../../profiles/models/profile.entity';

@Entity('businesses')
export class Business extends BaseEntity {
  @Column()
  profile_id: number;

  @Column()
  name: string;

  @Column({ type: 'jsonb' })
  metadata: Record<string, any>;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
