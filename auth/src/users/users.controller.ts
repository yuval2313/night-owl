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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './models/users.entity';
import { RequestWithValidatedUser } from './interfaces/req-with-user.interface';
import { CreateUserDto } from './req-dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.findOneById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteUserById(
    @Param('id') id: string,
    @Request() req: RequestWithValidatedUser,
  ): Promise<User> {
    return this.usersService.remove(+id, req.user.userId);
  }
}
