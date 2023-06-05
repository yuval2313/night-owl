import { BaseEntity } from '../../models/base.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('profiles')
export class Profile extends BaseEntity {
  @PrimaryColumn({ unique: true, readonly: true })
  user_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  about: string;
}
