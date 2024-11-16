import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RegionalModule } from 'src/regionals/regional.module';
import { UserModule } from 'src/user/user.module';
import { ClinicsController } from './clinics.controller';
import { ClinicsService } from './clinics.service';
import { ClinicEntity } from './entities/clinics.entity';
import { IClinicsService } from './interface/clinics.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClinicEntity]),
    AuthModule,
    UserModule,
    RegionalModule,
  ],
  exports: [ClinicsService, IClinicsService],
  controllers: [ClinicsController],
  providers: [ClinicsService, {
    provide: IClinicsService,
    useClass: ClinicsService,
  }],
})
export class ClinicsModule {}
