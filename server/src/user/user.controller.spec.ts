import { Test, TestingModule } from "@nestjs/testing";
import { USER_SERVICE_INTERFACE } from "./injection.interface.types";
import { UserController } from "./user.controller";
import { IUserService } from "./user.interface";
import { AUTH_SERVICE_INTERFACE } from "src/auth/injection.interface.type";
import { AuthGuard } from "src/guards/auth.guard";
import { UserAlredyExistsDto } from "./dto/user-exists.dto";
import { UserdNotFoundDto } from "./dto/userid-notFond.dto";

describe('UserController', () => {
    let userController: UserController;
    let userService: IUserService;

    const id = '23266745-e633-401b-8422-6de304455398'
    const mockDeletedRecord = { affected: 1 };
    const mockDeletedRecordMessage = {
        message: 'Record deleted successfully',
        affected: 1,
      };

    const body = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
    };

    const errorResponse: UserAlredyExistsDto = {
        statusCode: 409,
        error: 'User already exists',
        message: 'Conflict',
    };

    const userNotFound: UserdNotFoundDto = {
        statusCode: 404,
        message: "User with ID 23266745-e633-401b-8422-6de304455398 not found",
        error: "Not Found"
    };
  
    const mockUserService: Partial<IUserService> = {
        create: jest.fn().mockResolvedValue(body),
        readOne: jest.fn(), 
        readAll: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        userAlredyExist: jest.fn(),
    }

    const mockAuthService = {}; 
    const mockAuthGuard = {
        canActivate: jest.fn(() => true), 
    };

    beforeEach(async () => {
      jest.clearAllMocks();

      const module: TestingModule = await Test.createTestingModule({
        controllers: [UserController],
        providers: [
          {
            provide: USER_SERVICE_INTERFACE,
            useValue: mockUserService,
          },
          {
            provide: AUTH_SERVICE_INTERFACE, 
            useValue: mockAuthService,
          },
        ],
      })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();
  
      userController = module.get<UserController>(UserController);
      userService = module.get<IUserService>(USER_SERVICE_INTERFACE);
    });

    it('should be defined', () => {
      expect(userController).toBeDefined();
    });

    describe('create', () => {
      it('deve chamar userService.create', async () => {
        const result = await userController.create(body);
  
        expect(userService.create).toHaveBeenCalledWith(body);
        expect(userService.create).toHaveBeenCalledTimes(1);
        expect(result).toEqual(body);
      });

      it('deve retornar um conflito caso o usuário já exista', async () => {
          (userService.create as jest.Mock).mockRejectedValue(errorResponse)

          await expect(userController.create(body)).rejects.toEqual(errorResponse);
          expect(userService.create).toHaveBeenCalledWith(body);
      })
    });

    describe('readOne', () => {
      it('deve chamar userService.readOne', async () => {
        await userController.readOne(id);
  
        expect(userService.readOne).toHaveBeenCalledWith(id);
        expect(userService.readOne).toHaveBeenCalledTimes(1);
      });

      it('deve retornar um conflito caso o usuário não exista', async () => {
        (userService.readOne as jest.Mock).mockRejectedValue(userNotFound)

        await expect(userController.readOne(id)).rejects.toEqual(userNotFound);
        expect(userService.readOne).toHaveBeenCalledWith(id);
     })
    });

    describe('readAll', () => {
      it('deve chamar userService.readAll', async () => {
        await userController.readAll();
  
        expect(userService.readAll).toHaveBeenCalled();
        expect(userService.readAll).toHaveBeenCalledTimes(1);
      });
    });

    describe('delete', () => {
        it('deve dar erro caso usuário não exista', async () => {
            (userService.delete as jest.Mock).mockRejectedValue(userNotFound)

            await expect(userController.delete(id)).rejects.toEqual(userNotFound);

            expect(userService.delete).toHaveBeenCalled();
            expect(userService.delete).toHaveBeenCalledTimes(1);
        });

        it('deve deletar um usuário', async () => {
            (userService.userAlredyExist as jest.Mock).mockResolvedValue(true); 
            (userService.delete as jest.Mock).mockResolvedValue(mockDeletedRecordMessage); 
        
            const result = await userController.delete(id);
        
            expect(userService.delete).toHaveBeenCalledTimes(1);
            expect(userService.delete).toHaveBeenCalledWith(id);

            expect(result).toEqual(mockDeletedRecordMessage);
        });
    });

    describe('update', () => {
      it('deve rejeitar caso usuário não exista', async () => {
        (userService.update as jest.Mock).mockRejectedValue(userNotFound)
  
        await expect(userController.update(body, id)).rejects.toEqual(userNotFound);
        expect(userService.update).toHaveBeenCalledWith(body, id);
        expect(userService.update).toHaveBeenCalledTimes(1);
      });

      it('deve rejeitar caso tente mudar o email para um já existente', async () => {
        (userService.update as jest.Mock).mockRejectedValue(errorResponse)
  
        await expect(userController.update(body, id)).rejects.toEqual(errorResponse);
        expect(userService.update).toHaveBeenCalledWith(body, id);
        expect(userService.update).toHaveBeenCalledTimes(1);
      });

      it('deve atualizar um usuário', async () => {
        (userService.update as jest.Mock).mockResolvedValue(body)

        const result = await userController.update(body, id);
  
        expect(userService.update).toHaveBeenCalledWith(body, id);
        expect(userService.update).toHaveBeenCalledTimes(1);

        await expect(result).toEqual(body);
      });
    });
});