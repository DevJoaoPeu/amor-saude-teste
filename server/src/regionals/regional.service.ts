import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionalEntity } from './entities/regional.entity';
import { Repository } from 'typeorm';
import { CreateRegionalDto } from './dto/create-regional.dto';
import { UpdateRegionalDto } from './dto/update-regional.dto';

@Injectable()
export class RegionalService {
  constructor(
    @InjectRepository(RegionalEntity)
    private readonly repository: Repository<RegionalEntity>,
  ) {}

  async create(data: CreateRegionalDto) {
    await this.regionalExists(data.name);
    return await this.repository.save(data);
  }

  async readOne(id: string) {
    const regional = await this.repository.findOne({ where: { id } });

    if (!regional) {
      throw new NotFoundException('Regional not found');
    }

    return regional;
  }

  async readAll() {
    return this.repository.find();
  }

  async update(name: UpdateRegionalDto, id: string) {
    await this.regionalExists(name);
    await this.readOne(id);
    await this.repository.update(id, name);
    return await this.repository.findOne({ where: { id } });
  }

  async delete(id: string) {
    await this.readOne(id);
    const deletedRecord = await this.repository.delete(id);

    return {
      message: 'Record deleted successfully',
      deletedRecord,
    };
  }

  async regionalExists(name) {
    const findRegional = await this.repository.findOne({ where: { name } });

    if (findRegional) {
      throw new ConflictException(`Name: ${name}, alredy in use`);
    }
  }
}
