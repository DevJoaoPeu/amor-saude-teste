import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create({ name, email, password }: CreateUserDto) {
    const newUser = this.repository.create({ name, email, password });
    return this.repository.save(newUser);
  }

  async update() {}

  async readOne() {}

  async readAll() {}

  async delete() {}
}
