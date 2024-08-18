import { Injectable } from '@nestjs/common';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly userService: UserService,
  ) {}

  async register(data: AuthRegisterDto) {
    await this.userService.userEmailExists(data.email);

    const hashedPassword = await hash(data.password, 10);

    const newUser = await this.repository.create({
      ...data,
      password: hashedPassword,
    });

    return await this.repository.save(newUser);
  }
}
