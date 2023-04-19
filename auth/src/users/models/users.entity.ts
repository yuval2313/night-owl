import { BaseEntity } from 'src/users/models/base.entity';
import { Column, Entity, BeforeInsert } from 'typeorm';
import { hash, compare } from 'bcrypt';

@Entity()
export class Users extends BaseEntity {
  @Column({ unique: true })
  username: string;

  // @Exclude()
  // @Column({ select: false })
  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
