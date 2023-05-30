import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './req-dtos/create-profile.dto';
import { UpdateProfileDto } from './req-dtos/update-profile.dto';
import { Profile } from './models/profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
  ) {}

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    const { user_id } = createProfileDto;

    const existingUserId = await this.profilesRepository.findOneBy({ user_id });
    if (existingUserId)
      throw new ConflictException('Profile with given user id already exists');

    const newProfile = this.profilesRepository.create(createProfileDto);
    const profile = await this.profilesRepository.save(newProfile);

    return profile;
  }

  async findOneByUserId(userId: number): Promise<Profile> {
    const profile = await this.profilesRepository.findOneBy({
      user_id: userId,
    });

    if (!profile)
      throw new NotFoundException('Profile with the given id was not found');

    return profile;
  }

  async updateOneByUserId(
    userId: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const profile = await this.findOneByUserId(userId);

    Object.assign(profile, updateProfileDto);

    const updatedProfile = await this.profilesRepository.save(profile);
    return updatedProfile;
  }

  async removeOneByUserId(userId: number): Promise<Profile> {
    const profile = await this.findOneByUserId(userId);
    const removedUser = await this.profilesRepository.softRemove(profile);

    return removedUser;
  }
}
