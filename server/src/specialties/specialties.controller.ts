import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { CreateSpecialtiesDto } from './dto/create-specialties.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ForbiddenErrorDto } from 'src/user/dto/forbidden-error.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { SpecialtiesEntity } from './entitites/specialties.entity.dto';
import { SpecialtiesNotFoundDto } from './dto/specialties-notfound-error.dto';
import { SPECIALTIES_SERVICE_INTERFACE } from './inject.interface.types';
import { ISpecialtiesService } from './specialties.interface';
import { UpdateClinicsSpecialtiesDto } from 'src/clinics-specialties/dto/update-clinics-specialties.dto';

@Controller('specialties')
@ApiTags('Specialties')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiSecurity('bearer')
@ApiResponse({
  status: 403,
  description: 'Forbidden.',
  type: ForbiddenErrorDto,
})
export class SpecialtiesController {
  constructor(
    @Inject(SPECIALTIES_SERVICE_INTERFACE)
    private readonly specialtiesService: ISpecialtiesService
  ) {}

  @ApiOperation({ summary: 'Create specialties' })
  @Post('create')
  @ApiResponse({
    status: 201,
    description: 'Specialties created successfully',
    type: SpecialtiesEntity,
  })
  @Post('create')
  async create(@Body() data: CreateSpecialtiesDto) {
    return this.specialtiesService.create(data);
  }

  @ApiOperation({ summary: 'Find one specialties' })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    type: SpecialtiesNotFoundDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Find one specialties',
    type: SpecialtiesEntity,
  })
  @Get('readOne/:id')
  async findOne(@Param('id') id: string) {
    return this.specialtiesService.readOne(id);
  }

  @ApiOperation({ summary: 'Update partial specialties' })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    type: SpecialtiesNotFoundDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Specialties update successfully',
    type: SpecialtiesEntity,
  })
  @Patch('update/:id')
  async update(@Body() data: CreateSpecialtiesDto, @Param('id') id: string) {
    return this.specialtiesService.update(id, data);
  }

  @ApiOperation({ summary: 'Find all specialties' })
  @ApiResponse({
    status: 200,
    description: 'Find all specialties',
    type: SpecialtiesEntity,
    isArray: true,
  })
  @Get('readAll')
  async readAll() {
    return this.specialtiesService.readAll();
  }

  @ApiOperation({ summary: 'Delete specialties' })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    type: SpecialtiesNotFoundDto,
  })
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.specialtiesService.delete(id);
  }
}
