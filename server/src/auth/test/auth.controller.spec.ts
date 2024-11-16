import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { IAuthService } from '../interface/auth.interface';
import { body, errorResponse, expectedToken, loginDto, unauthorizedResponse } from './utils';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: IAuthService;

  const mockAuthService: Partial<IAuthService> = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: IAuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<IAuthService>(IAuthService);
  });

  it('deve estar definido', () => {
    expect(authController).toBeDefined();
  });

  describe('register', () => {
    it('deve chamar o authService.register com o body correto', async () => {
      (authService.register as jest.Mock).mockResolvedValue(expectedToken.token);

      const result = await authController.register(body);

      expect(authService.register).toHaveBeenCalledWith(body);
      expect(authService.register).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedToken.token);
    });

    it('deve retornar um erro de conflito se o usuário já existe', async () => {
      (authService.register as jest.Mock).mockRejectedValue(errorResponse);

      await expect(authController.register(body)).rejects.toEqual(errorResponse);
      expect(authService.register).toHaveBeenCalledWith(body);
    });
  });

  describe('login', () => {
    it('deve chamar o authService.login com email e password corretos', async () => {
      (authService.login as jest.Mock).mockResolvedValue(expectedToken.token);

      const result = await authController.login(loginDto);

      expect(authService.login).toHaveBeenCalledWith(loginDto.email, loginDto.password);
      expect(authService.login).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedToken.token);
    });

    it('deve retornar um erro de autorização se o login falhar', async () => {
      (authService.login as jest.Mock).mockRejectedValue(unauthorizedResponse);

      await expect(authController.login(loginDto)).rejects.toEqual(unauthorizedResponse);
      expect(authService.login).toHaveBeenCalledWith(loginDto.email, loginDto.password);
      expect(authService.login).toHaveBeenCalledTimes(1);
    });
  });
});
