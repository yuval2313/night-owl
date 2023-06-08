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
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({
    type: User,
    description: 'Successfully registered user',
  })
  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @ApiBearerAuth('access')
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
  @UseGuards(AccessTokenAuthGuard)
  @Get('/:id')
  getUserById(@Param('id', ValidIdPipe) id: number): Promise<User> {
    return this.usersService.findOneById(+id);
  }

  @ApiBearerAuth('access')
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
  @UseGuards(AccessTokenAuthGuard)
  @Delete('/:id')
  deleteUserById(
    @Param('id', ValidIdPipe) id: number,
    @Request() req: RequestWithValidatedUser,
  ): Promise<User> {
    return this.usersService.removeOneById(+id, req.user.userId);
  }
}
