import { Injectable } from '@nestjs/common';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import { CreateUserDto } from './req-dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/users.entity';
import { PostgresErrorCode } from '../database/constraints/errors.constraint';
import { UserNotFoundException } from './errors/user-not-found.error';
import { UserRemoveForbiddenException } from './errors/user-remove-forbidden.error';
import { UsernameConfictException } from './errors/username-exists.error';
import { TokenResponseDto } from '../auth/res-dtos/token-response.dto';

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
        throw new UsernameConfictException(createUserDto.username, err);
      throw err;
    }
  }

  async findOneById(id: number): Promise<User> {
    this.logger.info('Retrieving user by id');
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new UserNotFoundException(id);
    else this.logger.info('Successfully retrieved user');

    return user;
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

  async removeOneById(id: number, userId: number): Promise<User> {
    this.logger.info('Removing user by id');
    if (userId === id) {
      const user = await this.findOneById(id);
      const removedUser = await this.usersRepository.softRemove(user);

      this.logger.info('Successfully removed user by id');
      return removedUser;
    } else throw new UserRemoveForbiddenException(id, userId);
  }

  async updateTokens(id: number, tokens: TokenResponseDto): Promise<User> {
    this.logger.info("Updating user's authentication tokens");

    const user = await this.findOneById(id);
    await user.insertTokens(tokens);
    const updatedUser = await this.usersRepository.save(user);

    this.logger.info("Successfully updated user's tokens");
    return updatedUser;
  }

  async revokeTokens(id: number): Promise<User> {
    this.logger.info('Removing authentication tokens');

    const user = await this.findOneById(id);
    user.revokeTokens();
    const updatedUser = await this.usersRepository.save(user);

    this.logger.info("Successfully removed user's tokens");
    return updatedUser;
  }
}
