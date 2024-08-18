import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { CreateSpecialtiesDto } from './dto/create-specialties.dto';

@Controller('specialties')
export class SpecialtiesController {
  constructor(private readonly specialtiesService: SpecialtiesService) {}

  @Post('create')
  async create(@Body() data: CreateSpecialtiesDto) {
    return this.specialtiesService.create(data);
  }

  @Get('readOne/:id')
  async findOne(@Param('id') id: string) {
    return this.specialtiesService.readOne(id);
  }

  @Patch('update/:id')
  async update(@Body() data: CreateSpecialtiesDto, @Param('id') id: string) {
    return this.specialtiesService.update(id, data);
  }

  @Get('readAll')
  async readAll() {
    return this.specialtiesService.readAll();
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.specialtiesService.delete(id);
  }
}
