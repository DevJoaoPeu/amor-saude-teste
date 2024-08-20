import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: AuthRegisterDto) {
    await this.userService.userEmailExists(data.email);

    const hashedPassword = await hash(data.password, 10);

    const user = await this.repository.create({
      ...data,
      password: hashedPassword,
    });

    await this.repository.save(user);

    return this.createToken(user);
  }

  async createToken(user: UserEntity) {
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

  async checkToken(token: string) {
    try {
      const data = await this.jwtService.verify(token);

      return data;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async login(email: string, password: string) {
    const user = await this.repository.findOne({ where: { email } });

    const isPasswordValid = user && (await compare(password, user.password));

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException('Email e/ou senha incorretos');
    }

    return this.createToken(user);
  }
}
