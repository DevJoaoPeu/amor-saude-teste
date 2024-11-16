import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { USER_SERVICE_INTERFACE } from './interface/injection.interface.types';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, {
    provide: USER_SERVICE_INTERFACE,
    useClass: UserService,
  }],
  exports: [UserService, USER_SERVICE_INTERFACE],
})
export class UserModule {}
