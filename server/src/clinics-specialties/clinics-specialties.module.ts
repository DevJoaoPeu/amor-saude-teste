import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ClinicsModule } from 'src/clinics/clinics.module';
import { SpecialtiesModule } from 'src/specialties/specialties.module';
import { UserModule } from 'src/user/user.module';
import { ClinicsSpecialtiesController } from './clinics-specialties.controller';
import { ClinicsSpecialtiesServices } from './clinics-specialties.service';
import { ClinicsSpecialtiesEntity } from './entities/clinics-specialties.entity';
import { IClinicsSpecialtiesService } from './interface/clinics-specialties.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClinicsSpecialtiesEntity]),
    ClinicsModule,
    SpecialtiesModule,
    AuthModule,
    UserModule,
  ],
  controllers: [ClinicsSpecialtiesController],
  providers: [ClinicsSpecialtiesServices, 
  {
    provide: IClinicsSpecialtiesService,
    useClass: ClinicsSpecialtiesServices,
  },
],
  exports: [],
})
export class ClinicsSpecialtiesModule {}
