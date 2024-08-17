import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    await this.userEmailExists(email);
    return await this.repository.save(newUser);
  }

  async update(body: UpdateUserDto, id: string) {
    await this.userAlredyExist(id);

    if (body.email) {
      await this.userEmailExists(body.email);
    }

    await this.repository.update(id, body);

    return await this.readOne(id);
  }

  async readOne(id: string) {
    return await this.userAlredyExist(id);
  }

  async readAll() {
    return this.repository.find();
  }

  async delete(id: string) {
    await this.userAlredyExist(id);
    const deletedRecord = await this.repository.delete(id);

    return {
      message: 'Record deleted successfully',
      deletedRecord,
    };
  }

  async userAlredyExist(id: string) {
    const user = await this.repository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async userEmailExists(email: string) {
    const userEmail = await this.repository.findOne({ where: { email } });

    if (userEmail) {
      throw new ConflictException(`Email: ${email} already registered`);
    }
  }
}
