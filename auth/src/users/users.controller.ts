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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(AccessTokenAuthGuard)
  @Get('/:id')
  getUserById(@Param('id', ValidIdPipe) id: number): Promise<User> {
    return this.usersService.findOneById(+id);
  }

  @UseGuards(AccessTokenAuthGuard)
  @Delete('/:id')
  deleteUserById(
    @Param('id', ValidIdPipe) id: number,
    @Request() req: RequestWithValidatedUser,
  ): Promise<User> {
    return this.usersService.removeOneById(+id, req.user.userId);
  }
}
