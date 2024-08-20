import { Module } from '@nestjs/common';
import { ClinicsSpecialtiesController } from './clinics-specialties.controller';
import { ClinicsSpecialtiesServices } from './clinics-specialties.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicsSpecialtiesEntity } from './entities/clinics-specialties.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClinicsSpecialtiesEntity])],
  controllers: [ClinicsSpecialtiesController],
  providers: [ClinicsSpecialtiesServices],
  exports: [],
})
export class ClinicsSpecialtiesModule {}
