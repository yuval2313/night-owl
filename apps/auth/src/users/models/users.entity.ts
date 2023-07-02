import { BaseEntity } from '@app/shared/models/base.entity';
import { Column, Entity, BeforeInsert } from 'typeorm';
import { Exclude } from 'class-transformer';
import { hash, verify } from 'argon2';
import { TokenResponseDto } from '../../auth/res-dtos/token-response.dto';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User extends BaseEntity {
  @ApiProperty({ description: 'username property', example: 'Yuval' })
  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  access_token: string;

  @Column({ nullable: true })
  @Exclude()
  refresh_token: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password);
  }

  async insertTokens(tokens: TokenResponseDto): Promise<void> {
    const { accessToken, refreshToken } = tokens;

    this.access_token = await hash(accessToken);
    this.refresh_token = await hash(refreshToken);
  }

  revokeTokens(): void {
    this.access_token = null;
    this.refresh_token = null;
  }

  async comparePassword(password: string): Promise<boolean> {
    return this.password ? verify(this.password, password) : false;
  }
  async compareAccessToken(token: string): Promise<boolean> {
    return this.access_token ? verify(this.access_token, token) : false;
  }
  async compareRefreshToken(token: string): Promise<boolean> {
    return this.refresh_token ? verify(this.refresh_token, token) : false;
  }
}
