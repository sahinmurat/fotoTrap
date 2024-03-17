import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { ILoginResponse } from '../models/ILoginResponse';
import { IRefreshTokenResponse } from '../models/IRefreshTokenResponse';
import { JwtAuthService } from './jwt.service';
import { RefreshTokenService } from './refresh-token.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtAuthService: JwtAuthService,
        private readonly refreshTokenService: RefreshTokenService,
    ) { }

    async login(email: string, password: string): Promise<ILoginResponse> {
        try {
            const user = await this.getUser(email)

            if (!user) {
                throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                throw new HttpException('Email or password is false', HttpStatus.UNAUTHORIZED);
            }
            // Generate both access and refresh tokens
            const { accessToken, refreshToken } = this.jwtAuthService.generateToken({ email: user.email });

            // Extract expiration time from the access token
            const decodedToken = jwt.decode(accessToken) as { exp: number };
            const expiresAt = new Date(decodedToken.exp * 1000);

            return { accessToken, refreshToken, expiresAt, email: user.email };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            console.error('Error on login', error);
            throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async register(data: UserDto): Promise<ILoginResponse> {
        try {
            const id = uuid();
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword

            const addedIdRegisterData = { ...data, id };
            const result = await this.userRepository.save(addedIdRegisterData)

            // Generate both access and refresh tokens
            const { accessToken, refreshToken } = this.jwtAuthService.generateToken({ email: result.email });

            // Extract expiration time from the access token
            const expiresAt = this.getExpirationTime(accessToken)

            return { accessToken, refreshToken, expiresAt, email: result.email };
        } catch (error) {
            if (error.code === '23505' && error.constraint === 'UQ_e12875dfb3b1d92d7d7c5377e22') {
                throw new HttpException('Registration failed. The email address is already in use!',
                    HttpStatus.CONFLICT);
            }
            console.error('Error on registration', error);
            throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async refreshAccessToken(request: Request): Promise<IRefreshTokenResponse> {
        try {
            const refreshToken = request.headers['refresh-token'];
            if (!refreshToken) {
                throw new HttpException('Refresh token not provided', HttpStatus.UNAUTHORIZED);
            }

            // Verify and decode the refresh token
            const decodedRefreshToken = await this.refreshTokenService.verifyRefreshToken(refreshToken);

            // Get the user associated with the refresh token
            const user = await this.getUser(decodedRefreshToken.email)

            if (!user) {
                throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
            }

            // Generate a new access token
            const { accessToken } = this.jwtAuthService.generateToken({ email: user.email });
            const expiresAt = this.getExpirationTime(accessToken)

            return { accessToken, expiresAt, email: user.email };

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            console.error('Error on token refresh', error);
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private getExpirationTime(token: string) {
        const decodedToken = jwt.decode(token) as { exp: number };
        return new Date(decodedToken.exp * 1000);
    }

    private async getUser(email: string) {
        return await this.userRepository.findOne({
            where: {
                email
            }
        })
    }

}