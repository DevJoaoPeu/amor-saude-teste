import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { CreateClinicDto } from './dto/create-clinics.dto';
import { UpdateClinicsDto } from './dto/update-clinics.dto';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { ForbiddenErrorDto } from 'src/user/dto/forbidden-error.dto';

@Controller('clinics')
@ApiTags('Specialties')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiSecurity('bearer')
@ApiResponse({
  status: 403,
  description: 'Forbidden.',
  type: ForbiddenErrorDto,
})
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Post('create')
  async create(@Body() data: CreateClinicDto) {
    return this.clinicsService.create(data);
  }

  @Get('readOne/:id')
  async readOne(@Param('id') id: string) {
    return this.clinicsService.readOne(id);
  }

  @Get('readAll')
  async readAll() {
    return this.clinicsService.readAll();
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.clinicsService.delete(id);
  }

  @Patch('update/:id')
  async update(@Body() data: UpdateClinicsDto, @Param('id') id: string) {
    return this.clinicsService.update(data, id);
  }
}
