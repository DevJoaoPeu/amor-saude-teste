import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClinicsSpecialtiesEntity } from './entities/clinics-specialties.entity';

@Injectable()
export class ClinicsSpecialtiesServices {
  constructor(
    @InjectRepository(ClinicsSpecialtiesEntity)
    private readonly repository: Repository<ClinicsSpecialtiesEntity>,
  ) {}
}
