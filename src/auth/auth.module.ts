import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from '../app.service';
import { Component } from '../entities/component.entity';
import { User } from '../entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthService } from './jwt.service';
import { RefreshTokenService } from './refresh-token.service';


@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: parseInt(process.env.TOKEN_EXP_TIME) },
    }),
    TypeOrmModule.forFeature([User,  Component]),
  ],
  providers: [JwtAuthService, AuthService, RefreshTokenService, AppService],
  controllers: [AuthController],
  exports: [JwtAuthService, RefreshTokenService],
})
export class AuthModule { }