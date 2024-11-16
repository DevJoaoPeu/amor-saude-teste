import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAdapterModule } from 'src/jwt/jwt-adapter.module';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IAuthService } from './interface/auth.interface';

@Module({
  imports: [
    JwtAdapterModule,
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, {
    provide: IAuthService,
    useClass: AuthService,
  }],
  exports: [AuthService, IAuthService],
})
export class AuthModule {}
