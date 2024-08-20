import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  Length,
  IsBoolean,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { RegionalEntity } from '../../regionals/entities/regional.entity';
import { ApiProperty } from '@nestjs/swagger';
import { cnpj } from 'cpf-cnpj-validator';

@Entity('clinics')
export class ClinicEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @ApiProperty()
  id: string;

  @Column({ name: 'razao_social', type: 'varchar' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  @ApiProperty()
  razaoSocial: string;

  @Column({ name: 'nome_fantasia', type: 'varchar' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  @ApiProperty()
  nomeFantasia: string;

  @Column({ type: 'varchar', length: 18, unique: true })
  @IsNotEmpty()
  @IsString()
  @Length(14, 18) // Considerando a máscara 'XX.XXX.XXX/XXXX-XX'
  @ApiProperty()
  @Transform(({ value }) => cnpj.format(value))
  cnpj: string;

  @Column({ name: 'data_inauguracao', type: 'date' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  dataInauguracao: Date;

  @Column({ type: 'boolean', default: true })
  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  ativa: boolean;

  @ManyToOne(() => RegionalEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'regional_id' })
  @ApiProperty()
  regional: RegionalEntity;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Type(() => Date)
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @ApiProperty()
  updatedAt: Date;
}
