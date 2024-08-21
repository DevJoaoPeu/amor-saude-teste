import { ApiProperty } from '@nestjs/swagger';

export class ClinicsSpecialtiesNotFoundDto {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({
    example: 'ClinicsSpecialties not found',
  })
  message: string;

  @ApiProperty({ example: '2024-08-20T02:32:19.108Z' })
  timestamp: Date;

  @ApiProperty({
    example:
      '/clinics_specialties/readOne/87accf20-1940-4d46-833e-55299845da64',
  })
  path: string;
}
