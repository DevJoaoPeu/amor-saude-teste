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
import { ClinicsService } from './clinics.service';
import { CreateClinicDto } from './dto/create-clinics.dto';
import { UpdateClinicsDto } from './dto/update-clinics.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { ForbiddenErrorDto } from 'src/user/dto/forbidden-error.dto';
import { ClinicEntity } from './entities/clinics.entity';
import { ClinicsNotFoundDto } from './dto/clinics-notfound.dto';
import { IClinicsService } from './clinics.interface';
import { CLINICS_SERVICE_INTERFACE } from './inject.interface.type';

@Controller('clinics')
@ApiTags('Clinics')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiSecurity('bearer')
@ApiResponse({
  status: 403,
  description: 'Forbidden.',
  type: ForbiddenErrorDto,
})
export class ClinicsController {
  constructor(
    @Inject(CLINICS_SERVICE_INTERFACE)
    private readonly clinicsService: IClinicsService
  ) {}

  @ApiOperation({ summary: 'Create clinics' })
  @ApiResponse({
    status: 201,
    description: 'Regional created successfully',
    type: ClinicEntity,
  })
  @Post('create')
  async create(@Body() data: CreateClinicDto) {
    return this.clinicsService.create(data);
  }

  @ApiResponse({
    status: 404,
    description: 'Not Found',
    type: ClinicsNotFoundDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Find one regional',
    type: ClinicEntity,
  })
  @ApiOperation({ summary: 'Read one clinics' })
  @Get('readOne/:id')
  async readOne(@Param('id') id: string) {
    return this.clinicsService.readOne(id);
  }

  @ApiResponse({
    status: 404,
    description: 'Not Found',
    type: ClinicsNotFoundDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Read All regional',
    type: ClinicEntity,
    isArray: true,
  })
  @ApiOperation({ summary: 'Read all clinics' })
  @Get('readAll')
  async readAll() {
    return this.clinicsService.readAll();
  }

  @ApiOperation({ summary: 'Delete clinics' })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    type: ClinicsNotFoundDto,
  })
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.clinicsService.delete(id);
  }

  @ApiResponse({
    status: 404,
    description: 'Not Found',
    type: ClinicsNotFoundDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Update regional',
    type: ClinicEntity,
    isArray: true,
  })
  @ApiOperation({ summary: 'Update clinics' })
  @Patch('update/:id')
  async update(@Body() data: UpdateClinicsDto, @Param('id') id: string) {
    return this.clinicsService.update(data, id);
  }
}
