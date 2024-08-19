import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';
import { RegionalModule } from './regionals/regional.module';
import { RegionalEntity } from './regionals/entities/regional.entity';
import { SpecialtiesModule } from './specialties/specialties.module';
import { SpecialtiesEntity } from './specialties/entitites/specialties.entity.dto';
import { ClinicsModule } from './clinics/clinics.module';
import { ClinicEntity } from './clinics/entities/clinics.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development.local',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      entities: [UserEntity, RegionalEntity, SpecialtiesEntity, ClinicEntity],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    RegionalModule,
    SpecialtiesModule,
    ClinicsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
