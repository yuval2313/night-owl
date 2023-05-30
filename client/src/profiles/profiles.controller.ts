import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './req-dtos/create-profile.dto';
import { UpdateProfileDto } from './req-dtos/update-profile.dto';
import { Profile } from './models/profile.entity';
import { ValidIdPipe } from './pipes/valid-param-id.pipe';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profilesService.createProfile(createProfileDto);
  }

  @Get(':id')
  findOne(@Param('id', ValidIdPipe) userId: number): Promise<Profile> {
    return this.profilesService.findOneByUserId(userId);
  }

  @Patch(':id')
  update(
    @Param('id', ValidIdPipe) userId: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    return this.profilesService.updateOneByUserId(userId, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidIdPipe) userId: number): Promise<Profile> {
    return this.profilesService.removeOneByUserId(userId);
  }
}
