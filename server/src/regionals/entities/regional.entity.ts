import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('regional')
@Unique(['name'])
export class RegionalEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  @Column()
  name: string;
}
