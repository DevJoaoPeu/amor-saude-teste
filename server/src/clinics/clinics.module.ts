import { Module } from '@nestjs/common';
import { ClinicsController } from './clinics.controller';
import { ClinicsService } from './clinics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ClinicEntity } from './entities/clinics.entity';
import { RegionalModule } from 'src/regionals/regional.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClinicEntity]),
    AuthModule,
    UserModule,
    RegionalModule,
  ],
  exports: [ClinicsService],
  controllers: [ClinicsController],
  providers: [ClinicsService],
})
export class ClinicsModule {}
