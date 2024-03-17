import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenService {
    constructor(private readonly jwtService: JwtService) { }

    generateRefreshToken(payload: { email: string }): string {

        return this.jwtService.sign(payload, {
            secret: process.env.REFRESH_TOKEN_SECRET,
            expiresIn: process.env.REFRESH_TOKEN_EXP_TIME,
        });
    }

    async verifyRefreshToken(token: string) {
        try {
            return await this.jwtService.verifyAsync(token, {
                secret: process.env.REFRESH_TOKEN_SECRET,
            });
        } catch (error) {
            console.error('Refresh token is not valid');
            throw new HttpException('Invalid or expired refresh token', HttpStatus.UNAUTHORIZED);
        }
    }
}
