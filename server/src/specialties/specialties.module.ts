import { Module } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { SpecialtiesController } from './specialties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialtiesEntity } from './entitites/specialties.entity.dto';

@Module({
  imports: [TypeOrmModule.forFeature([SpecialtiesEntity])],
  exports: [],
  providers: [SpecialtiesService],
  controllers: [SpecialtiesController],
})
export class SpecialtiesModule {}
