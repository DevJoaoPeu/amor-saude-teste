import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ClinicEntity } from './entities/clinics.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClinicDto } from './dto/create-clinics.dto';
import { RegionalService } from 'src/regionals/regional.service';
import { cnpj } from 'cpf-cnpj-validator';

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

  transformCnpj(value: string): string {
    if (!cnpj.isValid(value)) {
      throw new BadRequestException('CNPJ inválido');
    }
    return cnpj.format(value);
  }
}
