import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { JWT_SERVICE_INTERFACE } from 'src/jwt/injection.interface.types';
import { IJwtService } from 'src/jwt/jwt-adapter.interface';
import { UserEntity } from 'src/user/entities/user.entity';
import { IUserService } from 'src/user/interface/user.interface';
import { Repository } from 'typeorm';
import { AuthService } from '../auth.service';
import { IAuthService } from '../interface/auth.interface';
import { createUserDto, expectedToken, hashedPassword, savedUser } from './utils';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let authService: IAuthService;
  let userRepository: Repository<UserEntity>;
  let userService: IUserService;
  let jwtService: IJwtService;

  jest.mock('bcrypt', () => ({ hash: jest.fn() }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: IAuthService,
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
          provide: IUserService,
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

    authService = module.get<IAuthService>(IAuthService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    userService = module.get<IUserService>(IUserService);
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

