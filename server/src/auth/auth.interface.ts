import { UserEntity } from "src/user/entities/user.entity";
import { JwtDto } from "./dto/jwt.dto";
import { JwtDecodedPayload } from "src/jwt/interface/jwt.interface";
import { AuthRegisterDto } from "./dto/auth-register.dto";

export interface IAuthService {
    register(data: AuthRegisterDto): Promise<JwtDto>;
    login(email: string, password: string): Promise<JwtDto>;
    checkToken(token: string): Promise<JwtDecodedPayload>;
    createToken(user: UserEntity): Promise<JwtDto>;
}