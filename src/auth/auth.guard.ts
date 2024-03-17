import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthService } from './jwt.service';
import { RefreshTokenService } from './refresh-token.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private refreshTokenService: RefreshTokenService,
        private readonly jwtAuthService: JwtAuthService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const token = this.extractTokenFromHeader(request);

            if (!token) {
                throw new HttpException('Token is not provided', HttpStatus.UNAUTHORIZED);
            }

            const [type, tokenValue] = token.split(' ');
            if (!(type === 'Bearer' || type === 'Refresh')) {
                throw new HttpException('Invalid token type', HttpStatus.UNAUTHORIZED);
            }

            if (type === 'Bearer') {
                const payload = await this.jwtAuthService.verifyToken(tokenValue);
                request['user'] = payload;
            } else if (type === 'Refresh') {
                const payload = await this.refreshTokenService.verifyRefreshToken(tokenValue);
                request['user'] = payload;
            }
            return true
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            console.error('Error on token validation', error);
            throw new HttpException('Invalid or expired refresh token', HttpStatus.UNAUTHORIZED);
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        return request.headers.authorization;
    }
}