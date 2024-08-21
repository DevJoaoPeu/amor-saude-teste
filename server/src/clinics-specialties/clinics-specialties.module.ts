import { Module } from '@nestjs/common';
import { ClinicsSpecialtiesController } from './clinics-specialties.controller';
import { ClinicsSpecialtiesServices } from './clinics-specialties.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicsSpecialtiesEntity } from './entities/clinics-specialties.entity';
import { ClinicsModule } from 'src/clinics/clinics.module';
import { SpecialtiesModule } from 'src/specialties/specialties.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClinicsSpecialtiesEntity]),
    ClinicsModule,
    SpecialtiesModule,
  ],
  controllers: [ClinicsSpecialtiesController],
  providers: [ClinicsSpecialtiesServices],
  exports: [],
})
export class ClinicsSpecialtiesModule {}
