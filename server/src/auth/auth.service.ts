import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { JwtDecodedPayload } from 'src/jwt/interface/jwt.interface';
import { IJwtService } from 'src/jwt/interface/jwt-adapter.interface';
import { UserEntity } from 'src/user/entities/user.entity';
import { IUserService } from 'src/user/interface/user.interface';
import { Repository } from 'typeorm';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { JwtDto } from './dto/jwt.dto';
import { IAuthService } from './interface/auth.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,

    private readonly userService: IUserService,

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
