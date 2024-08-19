import { ApiProperty } from '@nestjs/swagger';

export class SpecialtiesNotFoundDto {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({
    example: 'Specialties not found',
  })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;
}
