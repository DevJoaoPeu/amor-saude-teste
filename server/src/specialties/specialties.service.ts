import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecialtiesEntity } from './entitites/specialties.entity.dto';
import { CreateSpecialtiesDto } from './dto/create-specialties.dto';

@Injectable()
export class SpecialtiesService {
  constructor(
    @InjectRepository(SpecialtiesEntity)
    private readonly repository: Repository<SpecialtiesEntity>,
  ) {}

  async create(data: CreateSpecialtiesDto) {
    await this.specialtiesNameAlredyInUse(data.name);
    return await this.repository.save(data);
  }

  async readOne(id: string) {
    const specialties = await this.specialtiesAlredyExists(id);

    return specialties;
  }

  async readAll() {
    return await this.repository.find();
  }

  async delete(id: string) {
    await this.specialtiesAlredyExists(id);
    const deletedRecord = await this.repository.delete(id);

    return {
      message: 'Record deleted successfully',
      deletedRecord,
    };
  }

  async update(id: string, data: CreateSpecialtiesDto) {
    await this.specialtiesAlredyExists(id);
    await this.specialtiesNameAlredyInUse(data.name);
    await this.repository.update(id, data);
    return await this.repository.findOne({ where: { id } });
  }

  async specialtiesAlredyExists(id: string) {
    const specialties = await this.repository.findOne({ where: { id } });

    if (!specialties) {
      throw new NotFoundException('Specialties not found');
    }

    return specialties;
  }

  async specialtiesNameAlredyInUse(name: string) {
    const specialties = await this.repository.findOne({ where: { name } });

    if (specialties) {
      throw new ConflictException(`Name: ${name}, already in use`);
    }

    return specialties;
  }
}
