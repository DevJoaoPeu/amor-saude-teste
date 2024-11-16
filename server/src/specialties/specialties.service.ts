import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecialtiesEntity } from './entitites/specialties.entity.dto';
import { CreateSpecialtiesDto } from './dto/create-specialties.dto';
import { ISpecialtiesService } from './interface/specialties.interface';

@Injectable()
export class SpecialtiesService implements ISpecialtiesService {
  constructor(
    @InjectRepository(SpecialtiesEntity)
    private readonly repository: Repository<SpecialtiesEntity>,
  ) {}

  async create(data: CreateSpecialtiesDto): Promise<SpecialtiesEntity> {
    await this.specialtiesNameAlredyInUse(data.name);
    return await this.repository.save(data);
  }

  async readOne(id: string): Promise<SpecialtiesEntity> {
    const specialties = await this.specialtiesAlredyExists(id);

    return specialties;
  }

  async readAll(): Promise<SpecialtiesEntity[]> {
    return await this.repository.find();
  }

  async delete(id: string): Promise<{ message: string; affected: number }> {
    await this.specialtiesAlredyExists(id);
    const deletedRecord = await this.repository.delete(id);

    return {
      message: 'Record deleted successfully',
      affected: deletedRecord.affected,
    };
  }

  async update(id: string, data: CreateSpecialtiesDto): Promise<SpecialtiesEntity> {
    await this.specialtiesAlredyExists(id);
    await this.specialtiesNameAlredyInUse(data.name);
    await this.repository.update(id, data);
    return await this.repository.findOne({ where: { id } });
  }

  async specialtiesAlredyExists(id: string): Promise<SpecialtiesEntity> {
    const specialties = await this.repository.findOne({ where: { id } });

    if (!specialties) {
      throw new NotFoundException('Specialties not found');
    }

    return specialties;
  }

  async specialtiesNameAlredyInUse(name: string): Promise<SpecialtiesEntity> {
    const specialties = await this.repository.findOne({ where: { name } });

    if (specialties) {
      throw new ConflictException(`Name: ${name}, already in use`);
    }

    return specialties;
  }
}
