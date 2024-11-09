import { JwtPayload } from "jsonwebtoken";
import { JwtDecodedPayload } from "./interface/jwt.interface";

export interface IJwtService {
    sign(payload: JwtPayload, options?: { expiresIn: string; subject: string; issuer: string; audience: string }): string;
    verify(token: string): JwtDecodedPayload;
}
