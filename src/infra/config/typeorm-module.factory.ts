import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LoggerOptions } from 'typeorm';

async function typeOrmModuleFactory(
  config: ConfigService,
): Promise<TypeOrmModuleOptions> {
  return {
    type: 'postgres',
    host: config.getOrThrow<string>('DATABASE.HOST'),
    port: config.getOrThrow<number>('DATABASE.PORT'),
    username: config.getOrThrow<string>('DATABASE.USERNAME'),
    password: config.getOrThrow<string>('DATABASE.PASSWORD'),
    database: config.getOrThrow<string>('DATABASE.NAME'),
    ssl: config.get<boolean>('DATABASE.SSL'),

    entities: ['**/*.entity{.ts,.js}'],
    synchronize: config.get<boolean>('DATABASE.SYNC'),

    logging: (config
      .get<string>('DATABASE.LOG_LEVEL')
      .split(',') as LoggerOptions) ?? ['error'],
  };
}

export default typeOrmModuleFactory;
