import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { IJwtService } from 'src/jwt/jwt-adapter.interface';
import { IUserService } from 'src/user/user.interface';
import { JwtDto } from './dto/jwt.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { USER_SERVICE_INTERFACE } from 'src/user/injection.interface.types';
import { JWT_SERVICE_INTERFACE } from 'src/jwt/injection.interface.types';
import { AUTH_SERVICE_INTERFACE } from './injection.interface.type';
import { create } from 'domain';
import { IAuthService } from './auth.interface';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let authService: IAuthService;
  let userRepository: Repository<UserEntity>;
  let userService: IUserService;
  let jwtService: IJwtService;

  const createUserDto: AuthRegisterDto = { 
    name: 'John Doe', 
    email: 'john@example.com', 
    password: 'password123' 
  };
  const hashedPassword = 'hashed_password';
  const savedUser = { 
    id: '1', 
    email: createUserDto.email, 
    name: createUserDto.name, 
    password: hashedPassword 
  } as UserEntity;
  const expectedToken: JwtDto = { token: 'jwt_token_example' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AUTH_SERVICE_INTERFACE,
          useClass: AuthService,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn().mockReturnValue(savedUser),
            save: jest.fn().mockResolvedValue(savedUser),
            findOne: jest.fn(),
          },
        },
        {
          provide: USER_SERVICE_INTERFACE,
          useValue: { 
            userEmailExists: jest.fn(), 
          },
        },
        {
          provide: JWT_SERVICE_INTERFACE,
          useValue: {
            sign: jest.fn().mockReturnValue(expectedToken.token),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<IAuthService>(AUTH_SERVICE_INTERFACE);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    userService = module.get<IUserService>(USER_SERVICE_INTERFACE);
    jwtService = module.get<IJwtService>(JWT_SERVICE_INTERFACE);
  });

  describe('AuthService - create', () => {
    beforeEach(() => {
      (hash as jest.Mock).mockResolvedValue(hashedPassword);
    });

    it('deve criar um usuário com sucesso', async () => {
      await expect(authService.register(createUserDto)).resolves.toEqual(expectedToken);

      expect(userService.userEmailExists).toHaveBeenCalledWith(createUserDto.email);
      expect(hash).toHaveBeenCalledWith(createUserDto.password, 10);
      expect(userRepository.create).toHaveBeenCalledWith({
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
      });
      expect(userRepository.save).toHaveBeenCalledWith(savedUser);
      expect(jwtService.sign).toHaveBeenCalledWith(
        {
          id: savedUser.id,
          email: savedUser.email,
        },
        {
          expiresIn: '7 days',
          subject: String(savedUser.id),
          issuer: 'login',
          audience: 'users',
        },
      );
    });

    it('deve lançar ConflictException se o email já existir', async () => {
      jest.spyOn(userService, 'userEmailExists').mockRejectedValue(new ConflictException('Email already exists'));

      await expect(authService.register(createUserDto)).rejects.toThrow(ConflictException);
      expect(userService.userEmailExists).toHaveBeenCalledWith(createUserDto.email);
      expect(userRepository.save).not.toHaveBeenCalled();
    });
  });
});

