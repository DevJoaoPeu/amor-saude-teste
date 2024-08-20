import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateClinicsSpecialtiesDto {
  @IsUUID()
  @ApiProperty({ description: 'ID to specialties' })
  specialty_id: string;

  @IsUUID()
  @ApiProperty({ description: 'ID to clinics' })
  clinics_id: string;
}
