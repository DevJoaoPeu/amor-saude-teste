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
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: USER_SERVICE_INTERFACE,
          useValue: { 
            userEmailExists: jest.fn().mockResolvedValue(undefined), 
            userAlredyExist: jest.fn().mockResolvedValue({
              id: '1',
              name: 'John Doe',
              email: 'john@example.com',
              password: 'hashed_password',
            }),
          },
        },
        {
          provide: JWT_SERVICE_INTERFACE,
          useValue: {
            sign: jest.fn().mockReturnValue('jwt_token_example'),
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
    it('deve criar um usuário com sucesso', async () => {
      const createUserDto: AuthRegisterDto = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
      const hashedPassword = 'hashed_password';
      const savedUser = { id: '1', email: createUserDto.email, name: createUserDto.name, password: hashedPassword } as UserEntity;
      const expectedToken: JwtDto = { token: 'jwt_token_example' };
      
      // Configure os mocks para o teste
      (hash as jest.Mock).mockResolvedValue(hashedPassword);
      jest.spyOn(userRepository, 'create').mockReturnValue(savedUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(savedUser);
      jest.spyOn(userService, 'userEmailExists').mockResolvedValue(undefined);
      jest.spyOn(jwtService, 'sign').mockReturnValue(expectedToken.token);

      const result = await authService.register(createUserDto);

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
      expect(result).toEqual(expectedToken);
    });

    it('deve lançar ConflictException se o email já existir', async () => {
      const createUserDto: AuthRegisterDto = { name: 'Jane Doe', email: 'jane@example.com', password: 'password123' };

      jest.spyOn(userService, 'userEmailExists').mockRejectedValue(new ConflictException('Email already exists'));

      await expect(authService.register(createUserDto)).rejects.toThrow(ConflictException);
      expect(userService.userEmailExists).toHaveBeenCalledWith(createUserDto.email);
      expect(userRepository.save).not.toHaveBeenCalled();
    });
  });
});
