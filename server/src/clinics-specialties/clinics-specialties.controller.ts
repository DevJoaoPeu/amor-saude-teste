import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateClinicsSpecialtiesDto } from './dto/create-clinics-specialties.dto';
import { ClinicsSpecialtiesServices } from './clinics-specialties.service';

@Controller('clinics_specialties')
export class ClinicsSpecialtiesController {
  constructor(
    private readonly clinicsSpecialtiesService: ClinicsSpecialtiesServices,
  ) {}

  @Post('create')
  async create(@Body() data: CreateClinicsSpecialtiesDto) {
    return this.clinicsSpecialtiesService.create(data);
  }

  @Get('readAll')
  async readAll() {
    return this.clinicsSpecialtiesService.readAll();
  }
}
