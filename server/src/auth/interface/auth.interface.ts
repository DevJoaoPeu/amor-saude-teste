import { UserEntity } from "src/user/entities/user.entity";
import { JwtDto } from "../dto/jwt.dto";
import { JwtDecodedPayload } from "src/jwt/interface/jwt.interface";
import { AuthRegisterDto } from "../dto/auth-register.dto";

export abstract class IAuthService {
    abstract register(data: AuthRegisterDto): Promise<JwtDto>;
    abstract login(email: string, password: string): Promise<JwtDto>;
    abstract checkToken(token: string): Promise<JwtDecodedPayload>;
    abstract createToken(user: UserEntity): Promise<JwtDto>;
}