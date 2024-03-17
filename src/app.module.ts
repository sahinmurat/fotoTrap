import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import ormConfig from './config/orm.config';
import { Component } from './entities/component.entity';
import { User } from './entities/user.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), "public"),
      renderPath: path.join(process.cwd(), "public"),
      exclude: ['/api/(.*)'],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig
    }),
    TypeOrmModule.forFeature([User,  Component]),
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: process.env.TOKEN_EXP_TIME },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService
  ]
})
export class AppModule { }