import { Body, Controller, Post } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { CreateClinicDto } from './dto/create-clinics.dto';

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Post('create')
  async create(@Body() data: CreateClinicDto) {
    return this.clinicsService.create(data);
  }
}
