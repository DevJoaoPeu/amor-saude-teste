import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtDto } from './dto/jwt.dto';
import { IAuthService } from './auth.interface';
import { UserAlredyExistsDto } from '../user/dto/user-exists.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AUTH_SERVICE_INTERFACE } from './injection.interface.type';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: IAuthService;

  beforeEach(async () => {
    const mockAuthService: Partial<IAuthService> = {
      register: jest.fn(),
      login: jest.fn(),
    };

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
      const body: AuthRegisterDto = {
        name: 'John Doe',
        email: 'test@example.com',
        password: 'password123',
      };
      const expectedResponse: JwtDto = {
        token: 'jwt_token_example',
      };

      (authService.register as jest.Mock).mockResolvedValue(expectedResponse);

      const result = await authController.register(body);

      expect(authService.register).toHaveBeenCalledWith(body);
      expect(result).toEqual(expectedResponse);
    });

    it('deve retornar um erro de conflito se o usuário já existe', async () => {
      const body: AuthRegisterDto = {
        name: 'John Doe',
        email: 'test@example.com',
        password: 'password123',
      };
      const errorResponse: UserAlredyExistsDto = {
        statusCode: 409,
        error: 'User already exists',
        message: 'Conflict',
      };

      (authService.register as jest.Mock).mockRejectedValue(errorResponse);

      await expect(authController.register(body)).rejects.toEqual(errorResponse);
      expect(authService.register).toHaveBeenCalledWith(body);
    });
  });

  describe('login', () => {
    it('deve chamar o authService.login com email e password corretos', async () => {
      const loginDto: AuthLoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const expectedResponse: JwtDto = {
        token: 'jwt_token_example',
      };

      (authService.login as jest.Mock).mockResolvedValue(expectedResponse);

      const result = await authController.login(loginDto);

      expect(authService.login).toHaveBeenCalledWith(loginDto.email, loginDto.password);
      expect(result).toEqual(expectedResponse);
    });

    it('deve retornar um erro de autorização se o login falhar', async () => {
      const loginDto: AuthLoginDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };
      const errorResponse = {
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Invalid credentials',
      };

      (authService.login as jest.Mock).mockRejectedValue(errorResponse);

      await expect(authController.login(loginDto)).rejects.toEqual(errorResponse);
      expect(authService.login).toHaveBeenCalledWith(loginDto.email, loginDto.password);
    });
  });
});
