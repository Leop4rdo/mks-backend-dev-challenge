import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ListMoviesFiltersInputDTO } from 'src/application/use-cases/movie';
import {
  CreateUserUseCase,
  ListUsersOutputDTO,
  ListUsersUseCase,
  RefreshAccessTokenOutput,
  RefreshAccessTokenUseCase,
} from 'src/application/use-cases/user';
import {
  LoginOutputDTO,
  LoginUseCase,
} from 'src/application/use-cases/user/login.use-case';
import { AuthenticationGuard } from '../guards/authentication.guard';
import {
  CreateUserHttpRequest,
  LoginHttpRequest,
  RefreshAccessTokenHttpRequest,
} from '../requests';
import { UserHttpResponse } from '../responses';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUseCase: CreateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshUseCase: RefreshAccessTokenUseCase,
    private readonly listUseCase: ListUsersUseCase,
  ) {}

  @Post()
  @HttpCode(201)
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
  ): Promise<LoginOutputDTO> {
    return this.loginUseCase.execute(request);
  }

  @Post('refresh-acess-token')
  async refreshAccessToken(
    @Body()
    request: RefreshAccessTokenHttpRequest,
  ): Promise<RefreshAccessTokenOutput> {
    return await this.refreshUseCase.execute(request);
  }

  @Get()
  @UseGuards(AuthenticationGuard)
  async list(
    @Query()
    filters: ListMoviesFiltersInputDTO,
  ): Promise<ListUsersOutputDTO> {
    filters.limit = filters.limit ?? 32;
    filters.page = filters.page ?? 1;

    return await this.listUseCase.execute(filters);
  }
}
