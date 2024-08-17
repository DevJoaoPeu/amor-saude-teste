import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Patch('update/:id')
  async update(@Body() body: UpdateUserDto, @Param('id') id: string) {
    return this.userService.update(body, id);
  }

  @Get('readOne/:id')
  async readOne(@Param('id') id: string) {
    return this.userService.readOne(id);
  }
}
