import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CreateUserUseCase,
  LoginUseCase,
} from 'src/application/use-cases/user';
import TypeOrmModuleFactory from '../config/typeorm-module.factory';
import { UserRepository } from 'src/application/repositories';
import {
  AuthenticationTokenService,
  HashService,
} from 'src/application/services';
import { BcryptHashService, JwtAuthenticationTokenService } from '../services';
import { UserController } from '../http/controllers';
import { UserTypeOrmModel } from '../typeorm/models';
import { UserTypeOrmRepository } from '../typeorm/repositories';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmModuleFactory,
    }),
    TypeOrmModule.forFeature([UserTypeOrmModel]),
    JwtModule.register({}),
  ],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    LoginUseCase,
    { provide: UserRepository, useClass: UserTypeOrmRepository },
    { provide: HashService, useClass: BcryptHashService },
    {
      provide: AuthenticationTokenService,
      useClass: JwtAuthenticationTokenService,
    },
  ],
})
export class AppModule {}
