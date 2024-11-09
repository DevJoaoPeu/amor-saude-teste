import { Module } from '@nestjs/common';
import { ClinicsController } from './clinics.controller';
import { ClinicsService } from './clinics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ClinicEntity } from './entities/clinics.entity';
import { RegionalModule } from 'src/regionals/regional.module';
import { REGIONAL_SERVICE_INTERFACE } from 'src/regionals/inject.interface.type';
import { RegionalService } from 'src/regionals/regional.service';
import { CLINICS_SERVICE_INTERFACE } from './inject.interface.type';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClinicEntity]),
    AuthModule,
    UserModule,
    RegionalModule,
  ],
  exports: [ClinicsService, CLINICS_SERVICE_INTERFACE],
  controllers: [ClinicsController],
  providers: [ClinicsService, {
    provide: CLINICS_SERVICE_INTERFACE,
    useClass: ClinicsService,
  }],
})
export class ClinicsModule {}
