import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RegionalEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  name: string;
}
