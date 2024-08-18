import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RegionalService } from './regional.service';
import { CreateRegionalDto } from './dto/create-regional.dto';
import { UpdateRegionalDto } from './dto/update-regional.dto';

@Controller('regional')
export class RegionalController {
  constructor(private readonly regionalService: RegionalService) {}

  @Post('create')
  async create(@Body() body: CreateRegionalDto) {
    return this.regionalService.create(body);
  }

  @Get('readOne/:id')
  async readOne(@Param('id') id: string) {
    return this.regionalService.readOne(id);
  }

  @Get('readAll')
  async readAll() {
    return this.regionalService.readAll();
  }

  @Patch('update/:id')
  async update(@Body() name: UpdateRegionalDto, @Param('id') id: string) {
    return this.regionalService.update(name, id);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.regionalService.delete(id);
  }
}
