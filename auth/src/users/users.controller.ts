import {
  Controller,
  Get,
  Post,
  Delete,
  Request,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AccessTokenAuthGuard } from '../auth/guards/access-token-auth.guard';
import { User } from './models/users.entity';
import { RequestWithValidatedUser } from './interfaces/req-with-user.interface';
import { CreateUserDto } from './req-dtos/create-user.dto';
import { ValidIdPipe } from './pipes/valid-param-id.pipe';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CApiBearerAuth } from '../decorators/custom-api-bearer-auth.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({
    type: User,
    description: 'Successfully registered user',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error according to CreateUserDto',
  })
  @ApiConflictResponse({
    description: 'Conflict: Username already exists',
  })
  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @CApiBearerAuth('access')
  @ApiParam({
    name: 'id',
    description: 'User id (numerical)',
    example: '1',
    type: String,
  })
  @ApiOkResponse({
    type: User,
    description: 'Successfully returned user',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Invalid route parameter id (not a number)',
  })
  @ApiNotFoundResponse({ description: 'Not Found: User not found' })
  @UseGuards(AccessTokenAuthGuard)
  @Get('/:id')
  getUserById(@Param('id', ValidIdPipe) id: number): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @CApiBearerAuth('access')
  @ApiParam({
    name: 'id',
    description: 'User id (numerical)',
    example: '1',
    type: String,
  })
  @ApiOkResponse({
    type: User,
    description: 'Successfully deleted and returned user',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Cannot delete a different user',
  })
  @UseGuards(AccessTokenAuthGuard)
  @Delete('/:id')
  deleteUserById(
    @Param('id', ValidIdPipe) id: number,
    @Request() req: RequestWithValidatedUser,
  ): Promise<User> {
    return this.usersService.removeOneById(id, req.user.userId);
  }
}
