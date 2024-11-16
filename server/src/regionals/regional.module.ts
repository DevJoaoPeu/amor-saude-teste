import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { RegionalEntity } from './entities/regional.entity';
import { IRegionalService } from './interface/regional.interface';
import { RegionalController } from './regional.controller';
import { RegionalService } from './regional.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RegionalEntity]), AuthModule, UserModule
  ],
  controllers: [RegionalController],
  providers: [RegionalService,{
    provide: IRegionalService,
    useClass: RegionalService,
  }],
  exports: [IRegionalService],
})
export class RegionalModule {}
