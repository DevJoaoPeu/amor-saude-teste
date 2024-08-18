import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateRegionalDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  name: string;
}
