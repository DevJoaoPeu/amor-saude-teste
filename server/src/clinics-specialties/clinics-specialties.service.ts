import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IClinicsService } from 'src/clinics/interface/clinics.interface';
import { ISpecialtiesService } from 'src/specialties/interface/specialties.interface';
import { Repository } from 'typeorm';
import { CreateClinicsSpecialtiesDto } from './dto/create-clinics-specialties.dto';
import { UpdateClinicsSpecialtiesDto } from './dto/update-clinics-specialties.dto';
import { ClinicsSpecialtiesEntity } from './entities/clinics-specialties.entity';
import { IClinicsSpecialtiesService } from './interface/clinics-specialties.interface';

@Injectable()
export class ClinicsSpecialtiesServices implements IClinicsSpecialtiesService {
  constructor(
    @InjectRepository(ClinicsSpecialtiesEntity)
    private readonly repository: Repository<ClinicsSpecialtiesEntity>,

    private readonly clinic: IClinicsService,

    private readonly specialties: ISpecialtiesService,
  ) {}

  async create(data: CreateClinicsSpecialtiesDto): Promise<ClinicsSpecialtiesEntity> {
    const specialties = await this.specialties.readOne(data.specialty);
    const clinic = await this.clinic.readOne(data.clinic);

    const createRelation = await this.repository.create({
      clinic: clinic,
      specialty: specialties,
    });

    return await this.repository.save(createRelation);
  }

  async readAll(): Promise<ClinicsSpecialtiesEntity[]> {
    return this.repository.find();
  }

  async readOne(id: string): Promise<ClinicsSpecialtiesEntity> {
    return await this.clinicsSpecialtiesExists(id);
  }

  async update(id: string, data: UpdateClinicsSpecialtiesDto): Promise<ClinicsSpecialtiesEntity> {
    await this.clinicsSpecialtiesExists(id);
    const updateRelation: Partial<ClinicsSpecialtiesEntity> = {};

    if (data.clinic) {
      const clinic = await this.clinic.clinicsAlredyExists(data.clinic);
      updateRelation.clinic = clinic;
    }

    if (data.specialty) {
      const specialty = await this.specialties.specialtiesAlredyExists(
        data.specialty,
      );
      updateRelation.specialty = specialty;
    }

    await this.repository.update(id, updateRelation);

    return await this.readOne(id);
  }

  async delete(id: string): Promise<{ message: string; affected: number }> {
    await this.clinicsSpecialtiesExists(id);

    const deletedRecord = await this.repository.delete(id);

    return {
      message: 'Record deleted successfully',
      affected: deletedRecord.affected,
    };
  }

  async clinicsSpecialtiesExists(id: string): Promise<ClinicsSpecialtiesEntity> {
    const findRelation = await this.repository.findOne({ where: { id } });

    if (!findRelation) {
      throw new NotFoundException('Relation clinicsSpecialties not found');
    }

    return findRelation;
  }
}
