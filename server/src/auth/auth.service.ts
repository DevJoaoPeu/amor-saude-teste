import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common/decorators';
import { IJwtService } from 'src/jwt/jwt-adapter.interface';
import { JWT_SERVICE_INTERFACE } from 'src/jwt/injection.interface.types';
import { USER_SERVICE_INTERFACE } from 'src/user/injection.interface.types';
import { JwtDto } from './dto/jwt.dto';
import { JwtDecodedPayload } from 'src/jwt/interface/jwt.interface';
import { IAuthService } from './auth.interface';
import { IUserService } from 'src/user/user.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,

    @Inject(USER_SERVICE_INTERFACE)
    private readonly userService: IUserService,

    @Inject(JWT_SERVICE_INTERFACE) 
    private readonly jwtService: IJwtService,
  ) {}

  async register(data: AuthRegisterDto): Promise<JwtDto> {
    await this.userService.userEmailExists(data.email);

    const hashedPassword = await hash(data.password, 10);

    const user = await this.repository.create({
      ...data,
      password: hashedPassword,
    });

    await this.repository.save(user);

    return this.createToken(user);
  }

  async createToken(user: UserEntity): Promise<JwtDto> {
    return {
      token: this.jwtService.sign(
        {
          id: user.id,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: 'login',
          audience: 'users',
        },
      ),
    };
  }

  async checkToken(token: string): Promise<JwtDecodedPayload> {
    try {
      const data = await this.jwtService.verify(token);

      return data;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async login(email: string, password: string): Promise<JwtDto> {
    const user = await this.repository.findOne({ where: { email } });

    const isPasswordValid = user && (await compare(password, user.password));

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException('Email e/ou senha incorretos');
    }

    return this.createToken(user);
  }
}
