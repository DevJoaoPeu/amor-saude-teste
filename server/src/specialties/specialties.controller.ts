import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { ForbiddenErrorDto } from 'src/user/dto/forbidden-error.dto';
import { CreateSpecialtiesDto } from './dto/create-specialties.dto';
import { SpecialtiesNotFoundDto } from './dto/specialties-notfound-error.dto';
import { SpecialtiesEntity } from './entitites/specialties.entity.dto';
import { ISpecialtiesService } from './interface/specialties.interface';

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
