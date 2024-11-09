import {
  BadRequestException,
  Inject,
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
import { REGIONAL_SERVICE_INTERFACE } from 'src/regionals/inject.interface.type';
import { IRegionalService } from 'src/regionals/regional.interface';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(ClinicEntity)
    private readonly repository: Repository<ClinicEntity>,
    @Inject(REGIONAL_SERVICE_INTERFACE)
    private readonly regionalService: IRegionalService,
  ) {}

  async create(data: CreateClinicDto) {
    const regional = await this.regionalService.regionalAlredyExists(
      data.regional,
    );

    const valueCnpj = this.transformCnpj(data.cnpj);

    await this.clinicsCnpjAlredyExists(data.cnpj);

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
    const existingClinic = await this.clinicsAlredyExists(id);

    const regional = data.regional
      ? await this.regionalService.regionalAlredyExists(data.regional)
      : existingClinic.regional;

    if (data.cnpj) {
      await this.clinicsCnpjAlredyExists(data.cnpj);
    }

    const updatedCnpj = data.cnpj
      ? this.transformCnpj(data.cnpj)
      : existingClinic.cnpj;

    const updatedClinic = {
      ...existingClinic,
      ...data,
      regional,
      cnpj: updatedCnpj,
    };

    await this.repository.update(id, updatedClinic);

    return this.readOne(id);
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

  async clinicsCnpjAlredyExists(cnpj: string) {
    const clinics = await this.repository.findOne({ where: { cnpj } });

    if (clinics) {
      throw new NotFoundException('Already registered clinic');
    }

    return clinics;
  }
}
