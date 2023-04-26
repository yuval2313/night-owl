import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../auth/req-dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/users.entity';
import { PostgresErrorCode } from '../database/constraints/errors.constraint';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.usersRepository.create(createUserDto);
      return await this.usersRepository.save(newUser);
    } catch (err) {
      if (err?.code === PostgresErrorCode.UniqueViolation)
        throw new ConflictException('Given username already exists');
      throw err;
    }
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('Failed to find user');

    return user;
  }

  findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOneById(id);
    return this.usersRepository.softRemove(user);
  }
}
