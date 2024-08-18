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
import { RegionalService } from './regional.service';
import { CreateRegionalDto } from './dto/create-regional.dto';
import { UpdateRegionalDto } from './dto/update-regional.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ForbiddenErrorDto } from 'src/user/dto/forbidden-error.dto';
import { RegionalEntity } from './entities/regional.entity';
import { RegionalNotFoundDto } from './dto/regional-notfound.dto';

@Controller('regional')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiSecurity('bearer')
@ApiTags('Regionals')
@ApiResponse({
  status: 403,
  description: 'Forbidden.',
  type: ForbiddenErrorDto,
})
export class RegionalController {
  constructor(private readonly regionalService: RegionalService) {}

  @ApiOperation({ summary: 'Create regional' })
  @Post('create')
  @ApiResponse({
    status: 201,
    description: 'Regional created successfully',
    type: RegionalEntity,
  })
  async create(@Body() body: CreateRegionalDto) {
    return this.regionalService.create(body);
  }

  @ApiOperation({ summary: 'Find one regional' })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    type: RegionalNotFoundDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Find one regional',
    type: RegionalEntity,
  })
  @Get('readOne/:id')
  async readOne(@Param('id') id: string) {
    return this.regionalService.readOne(id);
  }

  @ApiOperation({ summary: 'Find all regionals' })
  @ApiResponse({
    status: 200,
    description: 'Find all regionals',
    type: RegionalEntity,
    isArray: true,
  })
  @Get('readAll')
  async readAll() {
    return this.regionalService.readAll();
  }

  @ApiOperation({ summary: 'Update partial regional' })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    type: RegionalNotFoundDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Regional update successfully',
    type: RegionalEntity,
  })
  @Patch('update/:id')
  async update(@Body() name: UpdateRegionalDto, @Param('id') id: string) {
    return this.regionalService.update(name, id);
  }

  @ApiOperation({ summary: 'Delete regional' })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    type: RegionalNotFoundDto,
  })
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.regionalService.delete(id);
  }
}
