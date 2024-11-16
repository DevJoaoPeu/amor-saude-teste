import { Test, TestingModule } from "@nestjs/testing";
import { USER_SERVICE_INTERFACE } from "./injection.interface.types";
import { UserService } from "./user.service";
import { UserEntity } from "./entities/user.entity";
import { AUTH_SERVICE_INTERFACE } from "src/auth/injection.interface.type";
import { IUserService } from "./user.interface";
import { JwtDto } from "src/auth/dto/jwt.dto";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ConflictException } from "@nestjs/common";
import { hash } from "bcrypt";
import { UserdNotFoundDto } from "./dto/userid-notFond.dto";
import { mock } from "node:test";

jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('hashed_password'),
}));

describe('UserService', () => {
    let userService: IUserService;
    let userRepository: Repository<UserEntity>;

    const body = { 
        name: 'John Doe', 
        email: 'john@example.com', 
        password: 'password123' 
    };

    const id = '23266745-e633-401b-8422-6de304455398'

    const mockUser = {
        id: '23266745-e633-401b-8422-6de304455398',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password', 
        role: 1, 
        createdAt: new Date(),
        updatedAt: new Date(),
    } as UserEntity;

    const userNotFound: UserdNotFoundDto = {
        statusCode: 404,
        message: "User with ID 23266745-e633-401b-8422-6de304455398 not found",
        error: "Not Found"
    };

    const mockDeletedRecordMessage = {
        message: 'Record deleted successfully',
        affected: 1,
    };

    const expectedToken: JwtDto = { token: 'jwt_token_example' };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: USER_SERVICE_INTERFACE,
                    useClass: UserService,
                },
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: {
                        create: jest.fn().mockReturnValue({}),
                        save: jest.fn().mockResolvedValue({}),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                        find: jest.fn(),
                    },
                },
            ],
        }).compile();

        userService = module.get<IUserService>(USER_SERVICE_INTERFACE);
        userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    })

    describe('create', () => {
        it('deve criar um usuário com sucesso', async () => {
            jest.spyOn(userService, 'userEmailExists').mockResolvedValue(undefined);
            jest.spyOn(userService['repository'], 'save').mockResolvedValue(mockUser);
        
            await expect(userService.create(body)).resolves.toEqual(mockUser);
        
            expect(userService.userEmailExists).toHaveBeenCalledWith(body.email);
            expect(userService['repository'].save).toHaveBeenCalledWith({
              name: body.name,
              email: body.email,
              password: expect.any(String), 
            });
        });
        
        it('deve lançar um erro se o email já estiver registrado', async () => {
            jest.spyOn(userService, 'userEmailExists').mockRejectedValue(new ConflictException('Email already exists'));

            await expect(userService.create(body)).rejects.toThrow(ConflictException);
            expect(userService.userEmailExists).toHaveBeenCalledWith(body.email);
            expect(userRepository.save).not.toHaveBeenCalled();
        });
    })
    describe('update', () => {
        it('deve rejeitar caso usuário não exista', async () => {
            jest.spyOn(userService, 'update').mockRejectedValue(userNotFound);
      
            await expect(userService.update(body, id)).rejects.toEqual(userNotFound);

            expect(userService.update).toHaveBeenCalledWith(body, id);
            expect(userService.update).toHaveBeenCalledTimes(1);
        });

        it('deve rejeitar caso tente mudar o email para um já existente', async () => {
            jest.spyOn(userService, 'update').mockRejectedValue(new ConflictException('Email already exists'));
      
            await expect(userService.update(body, id)).rejects.toThrow(ConflictException);

            expect(userService.update).toHaveBeenCalledWith(body, id);
            expect(userService.update).toHaveBeenCalledTimes(1);
        });

        it('deve atualizar um usuário', async () => {
            jest.spyOn(userService, 'update').mockResolvedValue(mockUser);

            const result = await userService.update(body, id);

            expect(userService.update).toHaveBeenCalledWith(body, id);
            expect(userService.update).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockUser);
        });
    })

    describe('delete', () => {
        it('deve dar erro caso usuário não exista', async () => {
            jest.spyOn(userService, 'delete').mockRejectedValue(userNotFound);
      
            await expect(userService.delete(id)).rejects.toEqual(userNotFound);

            expect(userService.delete).toHaveBeenCalledWith(id);
            expect(userService.delete).toHaveBeenCalledTimes(1);
        });

        it('deve deletar um usuário', async () => {
            jest.spyOn(userService, 'delete').mockResolvedValue(mockDeletedRecordMessage); 
        
            const result = await userService.delete(id);
        
            expect(userService.delete).toHaveBeenCalledTimes(1);
            expect(userService.delete).toHaveBeenCalledWith(id);
            expect(result).toEqual(mockDeletedRecordMessage);
        });
    })

    describe('readOne', () => {
        it('deve chamar userService.readOne', async () => {
            jest.spyOn(userService, 'readOne').mockResolvedValue(mockUser);
      
            const result = await userService.readOne(id);
      
            expect(userService.readOne).toHaveBeenCalledWith(id);
            expect(userService.readOne).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockUser);
        });

        it('deve retornar um conflito caso o usuário não exista', async () => {
            jest.spyOn(userService, 'readOne').mockRejectedValue(userNotFound)
      
            await expect(userService.readOne(id)).rejects.toEqual(userNotFound);    
            expect(userService.readOne).toHaveBeenCalledWith(id);
            expect(userService.readOne).toHaveBeenCalledTimes(1);
        });
    })

    describe('readAll', () => {
        it('deve chamar userService.readAll', async () => {
            jest.spyOn(userService, 'readAll').mockResolvedValue([mockUser]);
      
            const result = await userService.readAll();
      
            expect(userService.readAll).toHaveBeenCalled();
            expect(userService.readAll).toHaveBeenCalledTimes(1);
            expect(result).toEqual([mockUser]);
        });
    })

    describe('userEmailExists', () => {
        it('deve chamar userService.userEmailExists', async () => {
            jest.spyOn(userService, 'userEmailExists').mockResolvedValue(undefined);
      
            const result = await userService.userEmailExists(body.email);
      
            expect(userService.userEmailExists).toHaveBeenCalledWith(body.email);
            expect(userService.userEmailExists).toHaveBeenCalledTimes(1);
            expect(result).toEqual(undefined);
        });

        it('deve retornar um conflito caso o usuário não exista', async () => {
            jest.spyOn(userService, 'userEmailExists').mockRejectedValue(new ConflictException('Email already exists'));
      
            await expect(userService.userEmailExists(body.email)).rejects.toThrow(ConflictException);    
            expect(userService.userEmailExists).toHaveBeenCalledWith(body.email);
            expect(userService.userEmailExists).toHaveBeenCalledTimes(1);
        });
    })

    describe('userAlredyExist', () => {
        it('deve chamar userService.userAlredyExist', async () => {
            jest.spyOn(userService, 'userAlredyExist').mockResolvedValue(mockUser);
      
            const result = await userService.userAlredyExist(id);
      
            expect(userService.userAlredyExist).toHaveBeenCalledWith(id);
            expect(userService.userAlredyExist).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockUser);
        });

        it('deve retornar um conflito caso o usuário não exista', async () => {
            jest.spyOn(userService, 'userAlredyExist').mockRejectedValue(userNotFound);
      
            await expect(userService.userAlredyExist(id)).rejects.toEqual(userNotFound);    
            expect(userService.userAlredyExist).toHaveBeenCalledWith(id);
            expect(userService.userAlredyExist).toHaveBeenCalledTimes(1);
        });
    })
})