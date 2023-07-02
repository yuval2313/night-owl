import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CApiBearerAuth } from '../decorators/custom-api-bearer-auth.decorator';
import { CreateSkillDto } from './req-dtos/create-skill.dto';
import { UpdateSkillDto } from './req-dtos/update-skill.dto';
import { Skill } from './models/skill.entity';

@ApiTags('skills')
@CApiBearerAuth()
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @ApiOperation({
    summary: 'This route creates a skill',
    description:
      "Creates a new skill associated to authenticated user's profile",
  })
  @ApiCreatedResponse({
    type: Skill,
    description: 'Successfully created skill',
  })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error' })
  @Post()
  createSkill(@Body() createSkillDto: CreateSkillDto): void {}

  @ApiOperation({ summary: 'This route updates a skill' })
  @ApiParam({ type: String, name: 'skillId', description: 'Skill id' })
  @ApiOkResponse({ type: Skill, description: 'Successfully updated skill' })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Only owner can perform this action',
  })
  @ApiNotFoundResponse({ description: 'Not Found: Could not find skill' })
  @Patch(':/skillId')
  updateSkill(
    @Param('skillId') skillId: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ): void {}

  @ApiOperation({
    summary: 'This route deletes a skill',
    description: 'Performs a soft deletion',
  })
  @ApiParam({ type: String, name: 'skillId', description: 'Skill id' })
  @ApiOkResponse({ type: Skill, description: 'Successfully deleted skill' })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error' })
  @ApiNotFoundResponse({ description: 'Not Found: Could not find skill' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Only owner can perform this action',
  })
  @Delete(':/skillId')
  removeSkill(@Param('skillId') skillId: string): void {}

  @ApiOperation({ summary: "This route gets a given profile's skills" })
  @ApiParam({ type: String, name: 'profileId', description: 'Profile id' })
  @ApiOkResponse({
    type: [Skill],
    description: 'Successfully retrieved skills',
  })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error' })
  @ApiNotFoundResponse({ description: 'Not Found: Could not find skills' })
  @Get(':/profileId')
  getProfileSkills(@Param('profileId') profileId: string): void {}
}
