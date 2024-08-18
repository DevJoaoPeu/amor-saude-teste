import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSpecialtiesDto {
  @ApiProperty()
  @IsString()
  name: string;
}
