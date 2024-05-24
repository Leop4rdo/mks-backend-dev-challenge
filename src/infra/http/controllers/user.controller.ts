import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/use-cases/user';
import {
  LoginOutput,
  LoginUseCase,
} from 'src/application/use-cases/user/login.use-case';
import { CreateUserHttpRequest, LoginHttpRequest } from '../requests';
import { UserHttpResponse } from '../responses';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUseCase: CreateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post()
  async createUser(
    @Body()
    request: CreateUserHttpRequest,
  ): Promise<UserHttpResponse> {
    return UserHttpResponse.fromEntity(
      await this.createUseCase.execute(request),
    );
  }

  @Post('login')
  async login(
    @Body()
    request: LoginHttpRequest,
  ): Promise<LoginOutput> {
    return this.loginUseCase.execute(request);
  }
}
