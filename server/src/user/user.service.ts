import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async update(body: UpdateUserDto, id: number) {
    await this.userAlredyExist(id);

    await this.repository.update(id, body);

    return await this.readOne(id);
  }

  async readOne(id: number) {
    return await this.userAlredyExist(id);
  }

  async readAll() {}

  async delete() {}

  async userAlredyExist(id: number) {
    const user = await this.repository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
