import { Module } from '@nestjs/common';
import { ClinicsSpecialtiesController } from './clinics-specialties.controller';
import { ClinicsSpecialtiesServices } from './clinics-specialties.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicsSpecialtiesEntity } from './entities/clinics-specialties.entity';
import { ClinicsModule } from 'src/clinics/clinics.module';
import { SpecialtiesModule } from 'src/specialties/specialties.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClinicsSpecialtiesEntity]),
    ClinicsModule,
    SpecialtiesModule,
    AuthModule,
    UserModule,
  ],
  controllers: [ClinicsSpecialtiesController],
  providers: [ClinicsSpecialtiesServices],
  exports: [],
})
export class ClinicsSpecialtiesModule {}
