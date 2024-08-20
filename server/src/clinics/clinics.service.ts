import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { ClinicEntity } from './entities/clinics.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClinicDto } from './dto/create-clinics.dto';
import { RegionalService } from 'src/regionals/regional.service';
import { cnpj } from 'cpf-cnpj-validator';
import { UpdateClinicsDto } from './dto/update-clinics.dto';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(ClinicEntity)
    private readonly repository: Repository<ClinicEntity>,
    private readonly regionalService: RegionalService,
  ) {}

  async create(data: CreateClinicDto) {
    const regional = await this.regionalService.readOne(data.regional);

    const valueCnpj = this.transformCnpj(data.cnpj);

    const newClinic = this.repository.create({
      ...data,
      regional,
      cnpj: valueCnpj,
    });

    return await this.repository.save(newClinic);
  }

  async readOne(id: string) {
    return this.clinicsAlredyExists(id);
  }

  async readAll() {
    return this.repository.find();
  }

  async delete(id: string) {
    await this.clinicsAlredyExists(id);
    const deletedRecord = await this.repository.delete(id);

    return {
      message: 'Record deleted successfully',
      deletedRecord,
    };
  }

  async update(data: UpdateClinicsDto, id: string) {
    // await this.clinicsAlredyExists(id);
    // return this.repository.update(id, data);
  }

  transformCnpj(value: string): string {
    if (!cnpj.isValid(value)) {
      throw new BadRequestException('CNPJ inválido');
    }
    return cnpj.format(value);
  }

  async clinicsAlredyExists(id: string) {
    const clinics = await this.repository.findOne({ where: { id } });

    if (!clinics) {
      throw new NotFoundException('Clinics not found');
    }

    return clinics;
  }
}
