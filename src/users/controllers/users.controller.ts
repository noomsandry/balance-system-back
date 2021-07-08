import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateUserDto } from '../dto/users.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  show(@Param('id') id: string) {
    return this.usersService.showById(+id);
  }
}
