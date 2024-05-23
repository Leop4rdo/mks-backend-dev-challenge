import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { LoggerOptions } from 'typeorm';
import { UserTypeOrmModel } from '../typeorm/models/user-typeorm.model';

@Module({
  imports: [ConfigModule],
})
export default class TypeOrmModuleFactory implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.getOrThrow<string>('DATABASE.HOST'),
      port: this.config.getOrThrow<number>('DATABASE.PORT'),
      username: this.config.getOrThrow<string>('DATABASE.USERNAME'),
      password: this.config.getOrThrow<string>('DATABASE.PASSWORD'),
      database: this.config.getOrThrow<string>('DATABASE.NAME'),
      ssl: this.config.get<boolean>('DATABASE.SSL'),

      entities: [UserTypeOrmModel],
      synchronize: this.config.get<boolean>('DATABASE.SYNC'),

      logging: (this.config
        .get<string>('DATABASE.LOG_LEVEL')
        ?.split(',') as LoggerOptions) ?? ['error'],
    };
  }
}
