import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";

export interface IUserService {
    userEmailExists(email: string): Promise<void>;
    create({ name, email, password }: CreateUserDto): Promise<UserEntity>;
    update(body: UpdateUserDto, id: string): Promise<UserEntity>;
    readOne(id: string): Promise<UserEntity>;
    readAll(): Promise<UserEntity[]>;
    userAlredyExist(id: string): Promise<UserEntity>;
    delete(id: string): Promise<{ message: string; affected: number }>;
}