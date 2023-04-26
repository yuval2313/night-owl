import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../auth/req-dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/users.entity';
import { PostgresErrorCode } from '../database/constraints/errors.constraint';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      this.logger.log('Creating new user entity');

      const newUser = this.usersRepository.create(createUserDto);
      const user = await this.usersRepository.save(newUser);

      this.logger.log('Successfully created new user');
      return user;
    } catch (err) {
      if (err?.code === PostgresErrorCode.UniqueViolation) {
        const errMsg = 'Given username already exists';
        this.logger.error(
          `Postgres error code ${PostgresErrorCode.UniqueViolation} - unique constraint violation - ${errMsg}`,
        );
        throw new ConflictException(errMsg);
      }
      throw err;
    }
  }

  async findOneById(id: number): Promise<User> {
    this.logger.log('Retrieving user by id');
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      const errMsg = 'Failed to find user';
      this.logger.error(errMsg);
      throw new NotFoundException(errMsg);
    }

    this.logger.log('Successfully retrieved user');
    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    this.logger.log('Retrieving user by username');
    const user = await this.usersRepository.findOneBy({ username });

    if (!user) {
      const errMsg = 'Failed to find user';
      this.logger.error(errMsg);
      throw new NotFoundException(errMsg);
    }

    this.logger.log('Successfully retrieved user');
    return user;
  }

  async remove(id: number, userId: number): Promise<User> {
    this.logger.log('Removing user by id');
    if (userId === id) {
      const user = await this.findOneById(id);
      const removedUser = await this.usersRepository.softRemove(user);

      // TODO: should i check if user is successfully removed? If so what error to throw?

      this.logger.log('Successfully removed user by id');
      return removedUser;
    } else {
      const errMsg = 'Failed to remove user - can only remove own account';
      this.logger.error(errMsg);
      throw new ForbiddenException(errMsg);
    }
  }
}
