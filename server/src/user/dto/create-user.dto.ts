import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsDate,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 30)
  @ApiProperty()
  password: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  createdAt?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  updatedAt?: Date;
}
