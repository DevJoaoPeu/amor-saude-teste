import { UserEntity } from "src/user/entities/user.entity";
import { JwtDto } from "../dto/jwt.dto";
import { AuthRegisterDto } from "../dto/auth-register.dto";
import { AuthLoginDto } from "../dto/auth-login.dto";
import { UserAlredyExistsDto } from "src/user/dto/user-exists.dto";
import { UnauthorizedLoginDto } from "../dto/unauthorized-login.dto";

export const createUserDto: AuthRegisterDto = { 
    name: 'John Doe', 
    email: 'john@example.com', 
    password: 'password123' 
};

export const hashedPassword = 'hashed_password';

export const savedUser = { 
    id: '1', 
    email: createUserDto.email, 
    name: createUserDto.name, 
    password: hashedPassword 
} as UserEntity;

export const expectedToken: JwtDto = { token: 'jwt_token_example' };

export const body: AuthRegisterDto = {
    name: 'John Doe',
    email: 'test@example.com',
    password: 'password123',
};

export const loginDto: AuthLoginDto = {
    email: 'test@example.com',
    password: 'password123',
};

export const errorResponse: UserAlredyExistsDto = {
    statusCode: 409,
    error: 'User already exists',
    message: 'Conflict',
};

export const unauthorizedResponse: UnauthorizedLoginDto = {
    statusCode: 401,
    error: 'Unauthorized',
    message: 'Invalid credentials',
};

