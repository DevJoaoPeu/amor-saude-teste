import { PartialType } from '@nestjs/mapped-types';
import { CreateClinicDto } from './create-clinics.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateClinicsDto extends PartialType(CreateClinicDto) {
  @IsOptional()
  @IsString()
  @IsUUID()
  regional?: string;
}
