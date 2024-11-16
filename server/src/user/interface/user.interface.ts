import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class IUserService {
    abstract userEmailExists(email: string): Promise<void>;
    abstract create({ name, email, password }: CreateUserDto): Promise<UserEntity>;
    abstract update(body: UpdateUserDto, id: string): Promise<UserEntity>;
    abstract readOne(id: string): Promise<UserEntity>;
    abstract readAll(): Promise<UserEntity[]>;
    abstract userAlredyExist(id: string): Promise<UserEntity>;
    abstract delete(id: string): Promise<{ message: string; affected: number }>;
}