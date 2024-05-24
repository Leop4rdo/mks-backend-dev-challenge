import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CreateUserUseCase,
  ListUsersUseCase,
  LoginUseCase,
  RefreshAccessTokenUseCase,
} from 'src/application/use-cases/user';
import TypeOrmModuleFactory from '../config/typeorm-module.factory';
import { MovieRepository, UserRepository } from 'src/application/repositories';
import {
  AuthenticationTokenService,
  HashService,
} from 'src/application/services';
import { BcryptHashService, JwtAuthenticationTokenService } from '../services';
import { UserController } from '../http/controllers';
import { MovieTypeOrmModel, UserTypeOrmModel } from '../typeorm/models';
import { UserTypeOrmRepository } from '../typeorm/repositories';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationGuard } from '../http/guards/authentication.guard';
import { CreateMovieUseCase } from 'src/application/use-cases/movie';
import { MovieTypeOrmRepository } from '../typeorm/repositories/movie-typeorm.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmModuleFactory,
    }),
    TypeOrmModule.forFeature([UserTypeOrmModel, MovieTypeOrmModel]),
    JwtModule.register({}),
  ],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    LoginUseCase,
    RefreshAccessTokenUseCase,
    ListUsersUseCase,

    CreateMovieUseCase,

    AuthenticationGuard,
    { provide: UserRepository, useClass: UserTypeOrmRepository },
    { provide: HashService, useClass: BcryptHashService },
    {
      provide: AuthenticationTokenService,
      useClass: JwtAuthenticationTokenService,
    },
    { provide: MovieRepository, useClass: MovieTypeOrmRepository },
  ],
})
export class AppModule {}
