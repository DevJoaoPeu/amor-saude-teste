import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateSpecialtiesDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  name: string;
}
