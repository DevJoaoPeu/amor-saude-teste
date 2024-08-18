import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecialtiesEntity } from './entitites/specialties.entity.dto';
import { CreateSpecialtiesDto } from './dto/specialties-create.dto';

@Injectable()
export class SpecialtiesService {
  constructor(
    @InjectRepository(SpecialtiesEntity)
    private readonly repository: Repository<SpecialtiesEntity>,
  ) {}

  async create(data: CreateSpecialtiesDto) {
    return await this.repository.save(data);
  }
}
