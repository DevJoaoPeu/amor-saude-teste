import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRegionalDto {
  @ApiProperty()
  @IsString()
  name: string;
}
