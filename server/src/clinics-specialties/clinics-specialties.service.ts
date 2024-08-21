import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClinicsSpecialtiesEntity } from './entities/clinics-specialties.entity';
import { CreateClinicsSpecialtiesDto } from './dto/create-clinics-specialties.dto';
import { ClinicsService } from 'src/clinics/clinics.service';
import { SpecialtiesService } from 'src/specialties/specialties.service';

@Injectable()
export class ClinicsSpecialtiesServices {
  constructor(
    @InjectRepository(ClinicsSpecialtiesEntity)
    private readonly repository: Repository<ClinicsSpecialtiesEntity>,
    private readonly clinic: ClinicsService,
    private readonly specialties: SpecialtiesService,
  ) {}

  async create(data: CreateClinicsSpecialtiesDto) {
    const specialties = await this.specialties.readOne(data.specialty_id);
    const clinic = await this.clinic.readOne(data.clinics_id);

    const createRelation = await this.repository.create({
      clinic: clinic,
      specialty: specialties,
    });

    return await this.repository.save(createRelation);
  }

  async readAll() {
    return this.repository.find();
  }
}
