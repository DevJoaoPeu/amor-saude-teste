import { Body, Controller, Post } from '@nestjs/common';
import { RegionalService } from './regional.service';
import { CreateRegionalDto } from './dto/create-regional.dto';

@Controller('regional')
export class RegionalController {
  constructor(private readonly regionalService: RegionalService) {}

  @Post('create')
  async create(@Body() body: CreateRegionalDto) {
    return this.regionalService.create(body);
  }
}
