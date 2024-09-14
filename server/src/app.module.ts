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
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exeptions/exeptions-http-filter';
import { ClinicsSpecialtiesModule } from './clinics-specialties/clinics-specialties.module';
import { ClinicsSpecialtiesEntity } from './clinics-specialties/entities/clinics-specialties.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      entities: [
        UserEntity,
        RegionalEntity,
        SpecialtiesEntity,
        ClinicEntity,
        ClinicsSpecialtiesEntity,
      ],
      synchronize: true,
      ssl: false,
    }),
    AuthModule,
    UserModule,
    RegionalModule,
    SpecialtiesModule,
    ClinicsModule,
    ClinicsSpecialtiesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
