import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionalEntity } from './entities/regional.entity';
import { RegionalService } from './regional.service';
import { RegionalController } from './regional.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RegionalEntity])],
  controllers: [RegionalController],
  providers: [RegionalService],
  exports: [],
})
export class RegionalModule {}
