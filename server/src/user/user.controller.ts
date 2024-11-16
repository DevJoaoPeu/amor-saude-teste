import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
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
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enuns/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ForbiddenErrorDto } from './dto/forbidden-error.dto';
import { UserAlredyExistsDto } from './dto/user-exists.dto';
import { UserdNotFoundDto } from './dto/userid-notFond.dto';
import { USER_SERVICE_INTERFACE } from './interface/injection.interface.types';
import { IUserService } from './interface/user.interface';
@Controller('user')
@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@ApiTags('User')
@ApiBearerAuth()
@ApiSecurity('bearer')
@ApiResponse({
  status: 403,
  description: 'Forbidden.',
  type: ForbiddenErrorDto,
})
export class UserController {
  constructor(
    @Inject(USER_SERVICE_INTERFACE)
    private readonly userService: IUserService
  ) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({
    status: 201,
    description: 'user created successfully',
    type: UserEntity,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict',
    type: UserAlredyExistsDto,
  })
  @Post('create')
  async create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @ApiOperation({ summary: 'Update partial' })
  @ApiResponse({
    status: 409,
    description: 'Conflict',
    type: UserAlredyExistsDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Update',
    type: UserEntity,
  })
  @Patch('update/:id')
  async update(@Body() body: UpdateUserDto, @Param('id') id: string) {
    return this.userService.update(body, id);
  }

  @ApiResponse({
    status: 404,
    description: 'Not Found',
    type: UserdNotFoundDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Find one user',
    type: UserEntity,
  })
  @ApiOperation({ summary: 'User search one' })
  @Get('readOne/:id')
  async readOne(@Param('id') id: string) {
    return this.userService.readOne(id);
  }

  @ApiOperation({ summary: 'Users search all' })
  @ApiResponse({
    status: 200,
    description: 'Find all user',
    type: UserEntity,
    isArray: true,
  })
  @Get('readAll')
  async readAll() {
    return this.userService.readAll();
  }

  @ApiResponse({
    status: 404,
    description: 'Not Found',
    type: UserdNotFoundDto,
  })
  @ApiOperation({ summary: 'Delete user' })
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @ApiResponse({
    status: 404,
    description: 'Not Found',
    type: UserdNotFoundDto,
  })
  @ApiOperation({ summary: 'Returns user based on token' })
  @Post('me')
  async me(@User() user: UserEntity) {
    return user;
  }
}
