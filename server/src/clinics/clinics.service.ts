import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { cnpj } from 'cpf-cnpj-validator';
import { IRegionalService } from 'src/regionals/interface/regional.interface';
import { Repository } from 'typeorm';
import { CreateClinicDto } from './dto/create-clinics.dto';
import { UpdateClinicsDto } from './dto/update-clinics.dto';
import { ClinicEntity } from './entities/clinics.entity';
import { IClinicsService } from './interface/clinics.interface';

@Injectable()
export class ClinicsService implements IClinicsService {
  constructor(
    @InjectRepository(ClinicEntity)
    private readonly repository: Repository<ClinicEntity>,

    private readonly regionalService: IRegionalService,
  ) {}

  async create(data: CreateClinicDto): Promise<ClinicEntity> {
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

  async readOne(id: string): Promise<ClinicEntity> {
    return this.clinicsAlredyExists(id);
  }

  async readAll() {
    return this.repository.find();
  }

  async delete(id: string): Promise<{ message: string; affected: number }> {
    await this.clinicsAlredyExists(id);
    const deletedRecord = await this.repository.delete(id);

    return {
      message: 'Record deleted successfully',
      affected: deletedRecord.affected,
    };
  }

  async update(data: UpdateClinicsDto, id: string): Promise<ClinicEntity> {
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

  async clinicsAlredyExists(id: string): Promise<ClinicEntity> {
    const clinics = await this.repository.findOne({ where: { id } });

    if (!clinics) {
      throw new NotFoundException('Clinics not found');
    }

    return clinics;
  }

  async clinicsCnpjAlredyExists(cnpj: string): Promise<ClinicEntity> {
    const clinics = await this.repository.findOne({ where: { cnpj } });

    if (clinics) {
      throw new NotFoundException('Already registered clinic');
    }

    return clinics;
  }
}
