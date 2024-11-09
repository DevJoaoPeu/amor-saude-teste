import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtServiceAdapter } from './jwt-adapter.service';
import { ConfigModule } from '@nestjs/config';
import { IJwtServiceToken } from './injection.interface.types';

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
      provide: IJwtServiceToken,
      useClass: JwtServiceAdapter,
    },
  ],
  exports: [IJwtServiceToken],
})
export class JwtAdapterModule {}