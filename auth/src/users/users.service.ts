import { Injectable } from '@nestjs/common';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import { CreateUserDto } from './req-dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/users.entity';
import { PostgresErrorCode } from '../../db/constraints/errors.constraint';
import { TokenResponseDto } from '../auth/res-dtos/token-response.dto';
import { CConflictException } from '../errors/conflict.error';
import { CNotFoundException } from '../errors/not-found.error';
import { CForbiddenException } from '../errors/forbidden.error';

@Injectable()
export class UsersService {
  constructor(
    @InjectPinoLogger(UsersService.name)
    private readonly logger: PinoLogger,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      this.logger.info('Creating new user entity');

      const newUser = this.usersRepository.create(createUserDto);
      const user = await this.usersRepository.save(newUser);

      this.logger.info('Successfully created new user');
      return user;
    } catch (err) {
      if (err?.code === PostgresErrorCode.UNIQUE_VIOLATION)
        throw new CConflictException(
          'Given username already exists',
          { username: createUserDto.username },
          { cause: err },
        );
      throw err;
    }
  }

  async findOneById(id: string): Promise<User> {
    this.logger.info('Retrieving user by id');
    try {
      const user = await this.usersRepository.findOneByOrFail({ id });
      this.logger.info('Successfully retrieved user');
      return user;
    } catch (err) {
      throw new CNotFoundException(
        'Failed to find user',
        { targetUserId: id },
        { cause: err },
      );
    }
  }

  async findOneByUsername(username: string): Promise<User> {
    this.logger.info('Retrieving user by username');
    const user = await this.usersRepository.findOneBy({ username });

    if (!user)
      this.logger.error(
        { username },
        'Failed to find user with given username',
      );
    else this.logger.info('Successfully retrieved user');

    return user;
  }

  async removeOneById(id: string, userId: string): Promise<User> {
    this.logger.info('Removing user by id');
    if (userId === id) {
      const user = await this.findOneById(id);
      const removedUser = await this.usersRepository.softRemove(user);

      this.logger.info('Successfully removed user by id');
      return removedUser;
    } else
      throw new CForbiddenException('Failed to delete user', {
        targetUserId: id,
        userId,
      });
  }

  async updateTokens(id: string, tokens: TokenResponseDto): Promise<User> {
    this.logger.info("Updating user's authentication tokens");

    const user = await this.findOneById(id);
    await user.insertTokens(tokens);
    const updatedUser = await this.usersRepository.save(user);

    this.logger.info("Successfully updated user's tokens");
    return updatedUser;
  }

  async revokeTokens(id: string): Promise<User> {
    this.logger.info('Removing authentication tokens');

    const user = await this.findOneById(id);
    user.revokeTokens();
    const updatedUser = await this.usersRepository.save(user);

    this.logger.info("Successfully removed user's tokens");
    return updatedUser;
  }
}
