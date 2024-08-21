import { PartialType } from '@nestjs/mapped-types';
import { CreateClinicsSpecialtiesDto } from './create-clinics-specialties.dto';

export class UpdateClinicsSpecialtiesDto extends PartialType(
  CreateClinicsSpecialtiesDto,
) {}
