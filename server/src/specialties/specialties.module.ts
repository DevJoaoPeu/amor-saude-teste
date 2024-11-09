import { Module } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { SpecialtiesController } from './specialties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialtiesEntity } from './entitites/specialties.entity.dto';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { SPECIALTIES_SERVICE_INTERFACE } from './inject.interface.types';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpecialtiesEntity]),
    AuthModule,
    UserModule,
  ],
  exports: [SpecialtiesService],
  providers: [SpecialtiesService, {
    provide: SPECIALTIES_SERVICE_INTERFACE,
    useClass: SpecialtiesService
  }],
  controllers: [SpecialtiesController],
})
export class SpecialtiesModule {}
