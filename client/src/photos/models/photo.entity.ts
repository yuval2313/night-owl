import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../models/base.entity';

@Entity('photos')
export class Photo extends BaseEntity {
  @Column()
  url: string;

  @Column({ type: 'jsonb' })
  metadata: Record<string, any>;
}
