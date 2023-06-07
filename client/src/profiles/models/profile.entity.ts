import { BaseEntity } from '../../models/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('profiles')
export class Profile extends BaseEntity {
  @Column()
  user_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  photo_url: string;

  @Column({ type: 'jsonb' })
  metadata: Record<string, any>;
}
