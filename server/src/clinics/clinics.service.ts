import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ClinicEntity } from './entities/clinics.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClinicDto } from './dto/create-clinics.dto';
import { RegionalService } from 'src/regionals/regional.service';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(ClinicEntity)
    private readonly repository: Repository<ClinicEntity>,
    private readonly regionalService: RegionalService,
  ) {}

  async create(data: CreateClinicDto) {
    const regional = await this.regionalService.readOne(data.regional);

    const newClinic = this.repository.create({ ...data, regional });

    return await this.repository.save(newClinic);
  }
}
