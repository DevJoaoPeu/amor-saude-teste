import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateClinicsSpecialtiesDto {
  @IsUUID()
  @ApiProperty({ description: 'ID to specialties' })
  specialty: string;

  @IsUUID()
  @ApiProperty({ description: 'ID to clinics' })
  clinic: string;
}
