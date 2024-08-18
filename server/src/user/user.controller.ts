import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserEntity } from './entities/user.entity';
import { User } from 'src/decorators/user.decorator';

@Controller('user')
@UseGuards(AuthGuard)
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

  @Get('readAll')
  async readAll() {
    return this.userService.readAll();
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Post('me')
  async me(@User() user: UserEntity) {
    return user;
  }
}
