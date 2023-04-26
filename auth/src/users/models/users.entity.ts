import { BaseEntity } from './base.entity';
import { Column, Entity, BeforeInsert } from 'typeorm';
import { Exclude } from 'class-transformer';
import { hash, compare } from 'bcrypt';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 10);
  }

  comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
