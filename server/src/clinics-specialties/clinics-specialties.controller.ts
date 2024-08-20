import { Body, Controller } from '@nestjs/common';
import { CreateClinicsSpecialtiesDto } from './dto/create-clinics-specialties.dto';
import { ClinicsSpecialtiesServices } from './clinics-specialties.service';

@Controller()
export class ClinicsSpecialtiesController {
  constructor(
    private readonly clinicsSpecialtiesService: ClinicsSpecialtiesServices,
  ) {}

  async create(@Body() data: CreateClinicsSpecialtiesDto) {
    return this.clinicsSpecialtiesService.create(data);
  }
}
