import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { IUserService } from './interface/user.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, {
    provide: IUserService,
    useClass: UserService,
  }],
  exports: [UserService, IUserService],
})
export class UserModule {}
