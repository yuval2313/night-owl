import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Request,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../auth/dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('/:id')
  getUserById(@Param('id') id: number) {
    return this.usersService.findOneById(id);
  }

  @Delete('/:id')
  deleteUserById(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
