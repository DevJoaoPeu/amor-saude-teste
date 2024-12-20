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
import { hash } from 'bcrypt';
import { IUserService } from './interface/user.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create({ name, email, password }: CreateUserDto): Promise<UserEntity> {
    password = await hash(password, 10);
    await this.userEmailExists(email);
    return await this.repository.save({ name, email, password });
  }

  async update(body: UpdateUserDto, id: string): Promise<UserEntity> {
    await this.userAlredyExist(id);

    if (body.email) {
      await this.userEmailExists(body.email);
    }

    await this.repository.update(id, body);

    return await this.readOne(id);
  }

  async readOne(id: string): Promise<UserEntity> {
    return await this.userAlredyExist(id);
  }

  async readAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  async delete(id: string): Promise<{ message: string; affected: number }> {
    await this.userAlredyExist(id);
    const deletedRecord = await this.repository.delete(id);

    return {
      message: 'Record deleted successfully',
      affected: deletedRecord.affected,
    };
  }

  async userAlredyExist(id: string): Promise<UserEntity> {
    const user = await this.repository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async userEmailExists(email: string): Promise<void> {
    const userEmail = await this.repository.findOne({ where: { email } });

    if (userEmail) {
      throw new ConflictException(`Email: ${email} already registered`);
    }
  }
}
