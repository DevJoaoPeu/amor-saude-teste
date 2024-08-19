import {
  IsUUID,
  IsNotEmpty,
  IsString,
  Length,
  IsBoolean,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClinicDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  @ApiProperty({ description: 'Razão social da clínica' })
  razaoSocial: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  @ApiProperty({ description: 'Nome fantasia da clínica' })
  nomeFantasia: string;

  @IsNotEmpty()
  @IsString()
  @Length(14, 18) // Considerando a máscara 'XX.XXX.XXX/XXXX-XX'
  @ApiProperty({
    description: 'CNPJ da clínica',
    example: 'XX.XXX.XXX/XXXX-XX',
  })
  cnpj: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    description: 'Data de inauguração da clínica',
    example: '2024-08-15',
  })
  dataInauguracao: Date;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: 'Status ativo da clínica', default: true })
  ativa?: boolean;

  @IsUUID()
  @ApiProperty({ description: 'ID da regional associada à clínica' })
  regional: string;
}
