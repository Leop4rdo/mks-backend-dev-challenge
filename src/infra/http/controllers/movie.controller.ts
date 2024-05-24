import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UUID } from 'crypto';
import {
  CreateMovieUseCase,
  DeleteMovieUseCase,
  EditMovieUseCase,
  FindMovieByIdUseCase,
  ListMoviesFiltersInputDTO,
  ListMoviesOutputDTO,
  ListMoviesUseCase,
} from 'src/application/use-cases/movie';
import { Movie } from 'src/domain/entities';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { CreateMovieHttpRequest, EditMovieHttpRequest } from '../requests';

@UseGuards(AuthenticationGuard)
@Controller('movies')
export class MovieController {
  constructor(
    private readonly createUseCase: CreateMovieUseCase,
    private readonly listUseCase: ListMoviesUseCase,
    private readonly findByIdUseCase: FindMovieByIdUseCase,
    private readonly deleteUseCase: DeleteMovieUseCase,
    private readonly editUseCase: EditMovieUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() request: CreateMovieHttpRequest): Promise<Movie> {
    return this.createUseCase.execute(request);
  }

  @Get()
  list(
    @Query() filters: ListMoviesFiltersInputDTO,
  ): Promise<ListMoviesOutputDTO> {
    filters.page = filters.page ?? 1;
    filters.limit = filters.limit ?? 32;
    return this.listUseCase.execute(filters);
  }

  @Get(':id')
  findById(@Param('id') id: UUID): Promise<Movie> {
    return this.findByIdUseCase.execute(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: UUID): Promise<void> {
    await this.deleteUseCase.execute(id);
  }

  @Put(':id')
  async edit(
    @Param('id') id: UUID,
    @Body() request: EditMovieHttpRequest,
  ): Promise<Movie> {
    return this.editUseCase.execute(request, id);
  }
}
