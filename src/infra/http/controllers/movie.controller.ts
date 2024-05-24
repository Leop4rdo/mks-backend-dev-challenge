import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateMovieUseCase } from 'src/application/use-cases/movie';
import { Movie } from 'src/domain/entities';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { CreateMovieHttpRequest } from '../requests';

@UseGuards(AuthenticationGuard)
@Controller('movies')
export class MovieController {
  constructor(private readonly createUseCase: CreateMovieUseCase) {}

  @Post()
  async create(@Body() request: CreateMovieHttpRequest): Promise<Movie> {
    return this.createUseCase.execute(request);
  }
}
