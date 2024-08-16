import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AuthRegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  updatedAt?: Date;
}
