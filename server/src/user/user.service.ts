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

  async update(body: UpdateUserDto, id: string) {
    await this.userAlredyExist(id);

    return await this.repository.update(id, body);
  }

  async readOne(id: string) {
    return this.repository.findOneOrFail({ where: { id } });
  }

  async readAll() {}

  async delete() {}

  async userAlredyExist(id: string) {
    const user = await this.repository.count({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not exists');
    }
  }
}