import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from './refresh-token.service';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
  ) { }

  generateToken(payload: { email: string }) {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.TOKEN_SECRET,
      expiresIn: process.env.TOKEN_EXP_TIME,
    });
    const refreshToken = this.refreshTokenService.generateRefreshToken(payload);
    return { accessToken, refreshToken };
  }

  async verifyToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.TOKEN_SECRET
      });
    } catch (error) {
      console.error('Token is not valid');
      throw new HttpException('Invalid or expired token', HttpStatus.UNAUTHORIZED);
    }
  }
}