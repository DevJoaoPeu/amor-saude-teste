import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class SpecialtiesEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  @Column()
  name: string;
}
