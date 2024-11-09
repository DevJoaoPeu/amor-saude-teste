import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtAdapterModule } from 'src/jwt/jwt-adapter.module';
import { AUTH_SERVICE_INTERFACE } from './injection.interface.type';

@Module({
  imports: [
    JwtAdapterModule,
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, {
    provide: AUTH_SERVICE_INTERFACE,
    useValue: AuthService,
  }],
  exports: [AuthService],
})
export class AuthModule {}
