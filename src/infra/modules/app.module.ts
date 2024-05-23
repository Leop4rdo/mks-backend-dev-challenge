import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserUseCase } from 'src/application/use-cases/user';
import TypeOrmModuleFactory from '../config/typeorm-module.factory';
import { UserTypeOrmRepository } from '../typeorm/repositories/user-typeorm.repository';
import { UserRepository } from 'src/application/repositories';
import { HashService } from 'src/application/services';
import { BcryptHashService } from '../services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmModuleFactory,
    }),
  ],
  controllers: [],
  providers: [
    CreateUserUseCase,
    { provide: UserRepository, useClass: UserTypeOrmRepository },
    { provide: HashService, useClass: BcryptHashService },
  ],
})
export class AppModule {}
