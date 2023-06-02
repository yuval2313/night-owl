import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './req-dtos/create-profile.dto';
import { UpdateProfileDto } from './req-dtos/update-profile.dto';
import { Profile } from './models/profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CConflictException } from '../errors/conflict.error';
import { CNotFoundException } from '../errors/not-found.error';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectPinoLogger(ProfilesService.name)
    private readonly logger: PinoLogger,
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
  ) {}

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    this.logger.info('Creating new profile entity');

    this.logger.info('Verifying user id uniqueness');
    const { user_id } = createProfileDto;
    const existingUserId = await this.profilesRepository.findOneBy({
      user_id,
    });
    if (existingUserId)
      throw new CConflictException(
        'Profile with given user id already exists',
        { userId: user_id },
      );

    const newProfile = this.profilesRepository.create(createProfileDto);
    const profile = await this.profilesRepository.save(newProfile);

    this.logger.info('Successfully created profile enitity');
    return profile;
  }

  async findOneByUserId(userId: number): Promise<Profile> {
    this.logger.info('Retrieving profile by user id');
    const profile = await this.profilesRepository.findOneBy({
      user_id: userId,
    });

    if (!profile)
      throw new CNotFoundException(
        'Profile with the given user id was not found',
        { userId },
      );

    this.logger.info('Successfully retrieved profile by user id');
    return profile;
  }

  async updateOneByUserId(
    userId: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    this.logger.info('Updating profile entity by user id');

    const profile = await this.findOneByUserId(userId);

    Object.assign(profile, updateProfileDto);

    const updatedProfile = await this.profilesRepository.save(profile);

    this.logger.info('Successfully updated profile entity');
    return updatedProfile;
  }

  async removeOneByUserId(userId: number): Promise<Profile> {
    this.logger.info('Removing profile entity by user id');

    const profile = await this.findOneByUserId(userId);
    const removedUser = await this.profilesRepository.softRemove(profile);

    this.logger.info('Successfully removed profile entity');
    return removedUser;
  }
}
