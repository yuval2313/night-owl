import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../auth/dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './models/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);

    return this.usersRepository.save(newUser);
  }

  async findOneById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Failed to find user');
    }

    return user;
  }

  findOneByUsername(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  async remove(id: number) {
    const user = await this.findOneById(id);

    return this.usersRepository.softRemove(user);
  }
}
