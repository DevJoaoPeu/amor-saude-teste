import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegionalService } from './regional.service';
import { CreateRegionalDto } from './dto/create-regional.dto';

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
}
