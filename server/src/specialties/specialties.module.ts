import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { SpecialtiesEntity } from './entitites/specialties.entity.dto';
import { ISpecialtiesService } from './interface/specialties.interface';
import { SpecialtiesController } from './specialties.controller';
import { SpecialtiesService } from './specialties.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpecialtiesEntity]),
    AuthModule,
    UserModule,
  ],
  exports: [SpecialtiesService, ISpecialtiesService],
  providers: [SpecialtiesService, {
    provide: ISpecialtiesService,
    useClass: SpecialtiesService
  }],
  controllers: [SpecialtiesController],
})
export class SpecialtiesModule {}
