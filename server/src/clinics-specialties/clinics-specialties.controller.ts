import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateClinicsSpecialtiesDto } from './dto/create-clinics-specialties.dto';
import { ClinicsSpecialtiesServices } from './clinics-specialties.service';
import { UpdateClinicsSpecialtiesDto } from './dto/update-clinics-specialties.dto';

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

  @Get('readOne/:id')
  async readOne(@Param('id') id: string) {
    return this.clinicsSpecialtiesService.readOne(id);
  }

  @Patch('update/:id')
  async update(
    @Body() data: UpdateClinicsSpecialtiesDto,
    @Param('id') id: string,
  ) {
    return this.clinicsSpecialtiesService.update(id, data);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.clinicsSpecialtiesService.delete(id);
  }
}
