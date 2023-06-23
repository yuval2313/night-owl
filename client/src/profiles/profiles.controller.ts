import { Profile } from './models/profile.entity';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './req-dtos/create-profile.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CApiBearerAuth } from '../decorators/custom-api-bearer-auth.decorator';
import { UpdateProfileDto } from './req-dtos/update-profile.dto';

@ApiTags('profiles')
@CApiBearerAuth()
@Controller()
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @ApiOperation({ summary: 'this route creates a profile' })
  @ApiCreatedResponse({
    type: Profile,
    description: 'Successfully created profile',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiConflictResponse({
    description: 'Conflict: Profile with given user id already exists',
  })
  @Post()
  createProfile(@Body() createProfileDto: CreateProfileDto): void {}

  @ApiOperation({ summary: 'This route gets a profile by id' })
  @ApiParam({
    type: String,
    name: 'profileId',
    description: 'Profile id',
  })
  @ApiOkResponse({
    type: Profile,
    description: 'Successfully retreived profile',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiNotFoundResponse({
    description: 'Not Found: Could not find profile',
  })
  @Get('/:profileId')
  getProfileById(@Param('profileId') profileId: string): void {}

  @ApiOperation({ summary: 'This route updates and returns a profile' })
  @ApiParam({
    type: String,
    name: 'profileId',
    description: 'Profile id',
  })
  @ApiOkResponse({
    type: Profile,
    description: 'Successfully updated profile',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Only owner can perform this action',
  })
  @ApiNotFoundResponse({
    description: 'Not Found: Could not find profile',
  })
  @Patch('/:profileId')
  updateProfileById(
    @Param('profileId') profileId: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ): void {}
}
