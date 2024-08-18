import { Body, Controller, Post } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { CreateSpecialtiesDto } from './dto/specialties-create.dto';

@Controller('specialties')
export class SpecialtiesController {
  constructor(private readonly specialtiesService: SpecialtiesService) {}

  @Post('create')
  async create(@Body() data: CreateSpecialtiesDto) {
    return this.specialtiesService.create(data);
  }
}
