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

    const mockUser = {
        id: '23266745-e633-401b-8422-6de304455398',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password', 
        role: 1, 
        createdAt: new Date(),
        updatedAt: new Date(),
    } as UserEntity;

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
})