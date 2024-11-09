import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionalEntity } from './entities/regional.entity';
import { Repository } from 'typeorm';
import { CreateRegionalDto } from './dto/create-regional.dto';
import { IRegionalService } from './regional.interface';

@Injectable()
export class RegionalService implements IRegionalService {
  constructor(
    @InjectRepository(RegionalEntity)
    private readonly repository: Repository<RegionalEntity>,
  ) {}

  async create(data: CreateRegionalDto) {
    await this.regionalAlredyInUse(data.name);
    return await this.repository.save(data);
  }

  async readOne(id: string) {
    return await this.regionalAlredyExists(id);
  }

  async readAll() {
    return this.repository.find();
  }

  async update(data: CreateRegionalDto, id: string) {
    await this.regionalAlredyExists(id);
    await this.regionalAlredyInUse(data.name);
    await this.repository.update(id, data);
    return await this.repository.findOne({ where: { id } });
  }

  async delete(id: string) {
    await this.regionalAlredyExists(id);
    const deletedRecord = await this.repository.delete(id);

    return {
      message: 'Record deleted successfully',
      deletedRecord,
    };
  }

  async regionalAlredyExists(id: string): Promise<RegionalEntity> {
    const findRegional = await this.repository.findOne({ where: { id } });

    if (!findRegional) {
      throw new NotFoundException('Regional not found');
    }

    return findRegional;
  }

  async regionalAlredyInUse(name: string) {
    const findRegional = await this.repository.findOne({ where: { name } });

    if (findRegional) {
      throw new ConflictException(`Name: ${name}, alredy in use`);
    }
  }
}
