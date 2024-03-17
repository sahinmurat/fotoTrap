import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Component } from '../entities/component.entity';
import { User } from '../entities/user.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, Component],
    synchronize: true,
  })
);