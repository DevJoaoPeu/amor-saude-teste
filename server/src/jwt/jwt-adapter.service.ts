import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtService } from './interface/jwt-adapter.interface';
import { JwtDecodedPayload, JwtPayload } from './interface/jwt.interface';

@Injectable()
export class JwtServiceAdapter implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  verify(token: string): JwtDecodedPayload {
    return this.jwtService.verify(token);
  }
}