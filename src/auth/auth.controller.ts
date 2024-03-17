import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { UserDto } from '../dto/user.dto';
import { IRefreshTokenResponse } from '../models/IRefreshTokenResponse';
import { InternalServerError, UnauthorizedResponse } from '../models/exampleSwaggerResponses';
import { ILoginResponse } from './../models/ILoginResponse';
import { AuthService } from './auth.service';

@Controller('api/v1/')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiTags('Authentication')
    @Post('login')
    @ApiResponse({ status: 201, type: ILoginResponse })
    @ApiResponse({ status: 401, type: UnauthorizedResponse })
    @ApiResponse({ status: 500, type: InternalServerError })
    @ApiBody({ type: LoginDto })
    async login(@Body() data: LoginDto): Promise<ILoginResponse> {
        return await this.authService.login(data.email, data.password);
    }

    @ApiTags('Authentication')
    @Post('register')
    @ApiResponse({ status: 201, type: ILoginResponse })
    @ApiResponse({ status: 401, type: UnauthorizedResponse })
    @ApiResponse({ status: 500, type: InternalServerError })
    @ApiBody({ type: UserDto })
    async qrRegenerate(@Body() data: UserDto): Promise<ILoginResponse> {
        return await this.authService.register(data)
    }

    @ApiTags('Authentication')
    @Post('refresh-token')
    @ApiResponse({ status: 201, type: IRefreshTokenResponse })
    @ApiResponse({ status: 401, type: UnauthorizedResponse })
    @ApiResponse({ status: 500, type: InternalServerError })
    @ApiHeader({
        name: 'refresh-token',
        description: '<refresh_token_here>',
        required: true,
    })
    async refreshAccessToken(@Req() request: Request): Promise<IRefreshTokenResponse> {
        return await this.authService.refreshAccessToken(request);
    }
}
