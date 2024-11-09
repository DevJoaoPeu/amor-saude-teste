import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtDto } from './dto/jwt.dto';
import { UserAlredyExistsDto } from 'src/user/dto/user-exists.dto';
import { UnauthorizedLoginDto } from './dto/unauthorized-login.dto';
import { IAuthService } from './auth.interface';
import { AUTH_SERVICE_INTERFACE } from './injection.interface.type';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE_INTERFACE)
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
