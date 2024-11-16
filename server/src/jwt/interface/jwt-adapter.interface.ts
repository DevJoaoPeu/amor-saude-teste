import { JwtPayload } from "jsonwebtoken";
import { JwtDecodedPayload } from "./jwt.interface";

export abstract class IJwtService {
    abstract sign(payload: JwtPayload, options?: { expiresIn: string; subject: string; issuer: string; audience: string }): string;
    abstract verify(token: string): JwtDecodedPayload;
}
