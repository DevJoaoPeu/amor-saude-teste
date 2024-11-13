import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtDto } from './dto/jwt.dto';
import { IAuthService } from './auth.interface';
import { UserAlredyExistsDto } from '../user/dto/user-exists.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AUTH_SERVICE_INTERFACE } from './injection.interface.type';
import { ConflictException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: IAuthService;

  const mockAuthService: Partial<IAuthService> = {
    register: jest.fn(),
    login: jest.fn(),
  };


  const body: AuthRegisterDto = {
    name: 'John Doe',
    email: 'test@example.com',
    password: 'password123',
  };

  const loginDto: AuthLoginDto = {
    email: 'test@example.com',
    password: 'password123',
  };

  const expectedResponse: JwtDto = {
    token: 'jwt_token_example',
  };

  const errorResponse: UserAlredyExistsDto = {
    statusCode: 409,
    error: 'User already exists',
    message: 'Conflict',
  };

  const unauthorizedResponse = {
    statusCode: 401,
    error: 'Unauthorized',
    message: 'Invalid credentials',
  };


  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AUTH_SERVICE_INTERFACE,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<IAuthService>(AUTH_SERVICE_INTERFACE);
  });

  it('deve estar definido', () => {
    expect(authController).toBeDefined();
  });

  describe('register', () => {
    it('deve chamar o authService.register com o body correto', async () => {
      (authService.register as jest.Mock).mockResolvedValue(expectedResponse);

      const result = await authController.register(body);

      expect(authService.register).toHaveBeenCalledWith(body);
      expect(authService.register).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResponse);
    });

    it('deve retornar um erro de conflito se o usuário já existe', async () => {
      (authService.register as jest.Mock).mockRejectedValue(errorResponse);

      await expect(authController.register(body)).rejects.toEqual(errorResponse);
      expect(authService.register).toHaveBeenCalledWith(body);
    });
  });

  describe('login', () => {
    it('deve chamar o authService.login com email e password corretos', async () => {
      (authService.login as jest.Mock).mockResolvedValue(expectedResponse);

      const result = await authController.login(loginDto);

      expect(authService.login).toHaveBeenCalledWith(loginDto.email, loginDto.password);
      expect(authService.login).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResponse);
    });

    it('deve retornar um erro de autorização se o login falhar', async () => {
      (authService.login as jest.Mock).mockRejectedValue(unauthorizedResponse);

      await expect(authController.login(loginDto)).rejects.toEqual(unauthorizedResponse);
      expect(authService.login).toHaveBeenCalledWith(loginDto.email, loginDto.password);
      expect(authService.login).toHaveBeenCalledTimes(1);
    });
  });
});
