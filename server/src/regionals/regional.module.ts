import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionalEntity } from './entities/regional.entity';
import { RegionalService } from './regional.service';
import { RegionalController } from './regional.controller';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { REGIONAL_SERVICE_INTERFACE } from './inject.interface.type';

@Module({
  imports: [
    TypeOrmModule.forFeature([RegionalEntity]), AuthModule, UserModule
  ],
  controllers: [RegionalController],
  providers: [RegionalService,{
    provide: REGIONAL_SERVICE_INTERFACE,
    useClass: RegionalService,
  }],
  exports: [REGIONAL_SERVICE_INTERFACE],
})
export class RegionalModule {}
