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
import { CreateClinicsSpecialtiesDto } from './dto/create-clinics-specialties.dto';
import { ClinicsSpecialtiesServices } from './clinics-specialties.service';
import { UpdateClinicsSpecialtiesDto } from './dto/update-clinics-specialties.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ForbiddenErrorDto } from 'src/user/dto/forbidden-error.dto';
import { ClinicsSpecialtiesEntity } from './entities/clinics-specialties.entity';
import { ClinicsSpecialtiesNotFoundDto } from './dto/clinics-specialties-notfound.dto';

@Controller('clinics_specialties')
@ApiTags('clinics_specialties')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiSecurity('bearer')
@ApiResponse({
  status: 403,
  description: 'Forbidden.',
  type: ForbiddenErrorDto,
})
export class ClinicsSpecialtiesController {
  constructor(
    private readonly clinicsSpecialtiesService: ClinicsSpecialtiesServices,
  ) {}

  @ApiOperation({
    summary: 'Creating relationships between clinics and specialties',
  })
  @ApiResponse({
    status: 201,
    description:
      'Relationships between clinics and specialties created successfully',
    type: ClinicsSpecialtiesEntity,
  })
  @Post('create')
  async create(@Body() data: CreateClinicsSpecialtiesDto) {
    return this.clinicsSpecialtiesService.create(data);
  }

  @ApiResponse({
    status: 404,
    description: 'Relationships between clinics and specialties not found',
    type: ClinicsSpecialtiesNotFoundDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Read All regional',
    type: ClinicsSpecialtiesEntity,
    isArray: true,
  })
  @ApiOperation({
    summary: 'Find All relationships between clinics and specialties',
  })
  @Get('readAll')
  async readAll() {
    return this.clinicsSpecialtiesService.readAll();
  }

  @ApiResponse({
    status: 404,
    description: 'Relationships between clinics and specialties not found',
    type: ClinicsSpecialtiesNotFoundDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Find one relationships between clinics and specialties',
    type: ClinicsSpecialtiesEntity,
  })
  @ApiOperation({
    summary: 'Read one relationships between clinics and specialties',
  })
  @Get('readOne/:id')
  async readOne(@Param('id') id: string) {
    return this.clinicsSpecialtiesService.readOne(id);
  }

  @ApiResponse({
    status: 404,
    description: 'Relationships between clinics and specialties not found',
    type: ClinicsSpecialtiesNotFoundDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Update one relationships between clinics and specialties',
    type: ClinicsSpecialtiesEntity,
    isArray: true,
  })
  @ApiOperation({
    summary: 'Update one relationships between clinics and specialties',
  })
  @Patch('update/:id')
  async update(
    @Body() data: UpdateClinicsSpecialtiesDto,
    @Param('id') id: string,
  ) {
    return this.clinicsSpecialtiesService.update(id, data);
  }

  @ApiOperation({
    summary: 'Delete one relationships between clinics and specialties',
  })
  @ApiResponse({
    status: 404,
    description: 'Relationships between clinics and specialties not found',
    type: ClinicsSpecialtiesNotFoundDto,
  })
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.clinicsSpecialtiesService.delete(id);
  }
}
