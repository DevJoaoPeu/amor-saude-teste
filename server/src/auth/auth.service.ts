import { Injectable } from '@nestjs/common';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly repository: Repository<AuthEntity>,
  ) {}
  async register(data: AuthRegisterDto) {
    return this.repository.create();
  }
}
