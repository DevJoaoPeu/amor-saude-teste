import { JwtDto } from "src/auth/dto/jwt.dto";
import { UserAlredyExistsDto } from "../dto/user-exists.dto";
import { UserdNotFoundDto } from "../dto/userid-notFond.dto";
import { UserEntity } from "../entities/user.entity";

export const id = '23266745-e633-401b-8422-6de304455398'

export const body = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
};

export const errorResponse: UserAlredyExistsDto = {
    statusCode: 409,
    error: 'User already exists',
    message: 'Conflict',
};

export const mockUser = {
    id: '23266745-e633-401b-8422-6de304455398',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashed_password', 
    role: 1, 
    createdAt: new Date(),
    updatedAt: new Date(),
} as UserEntity;

export const userNotFound: UserdNotFoundDto = {
    statusCode: 404,
    message: "User with ID 23266745-e633-401b-8422-6de304455398 not found",
    error: "Not Found"
};

export const mockDeletedRecordMessage = {
    message: 'Record deleted successfully',
    affected: 1,
};

export const expectedToken: JwtDto = { token: 'jwt_token_example' };
