import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAlredyExistsDto } from 'src/user/dto/user-exists.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { JwtDto } from './dto/jwt.dto';
import { UnauthorizedLoginDto } from './dto/unauthorized-login.dto';
import { IAuthService } from './interface/auth.interface';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: IAuthService
  ) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: JwtDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict',
    type: UserAlredyExistsDto,
  })
  async register(@Body() body: AuthRegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Login',
    type: JwtDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedLoginDto,
  })
  async login(@Body() { email, password }: AuthLoginDto) {
    return await this.authService.login(email, password);
  }
}
