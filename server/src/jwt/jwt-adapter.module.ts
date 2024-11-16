import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { IJwtService } from './interface/jwt-adapter.interface';
import { JwtServiceAdapter } from './jwt-adapter.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: '7 days' },
  }),
],
  providers: [
    {
      provide: IJwtService,
      useClass: JwtServiceAdapter,
    },
  ],
  exports: [IJwtService],
})
export class JwtAdapterModule {}