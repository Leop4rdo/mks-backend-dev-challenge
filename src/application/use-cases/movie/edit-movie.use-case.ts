import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { MovieRepository } from 'src/application/repositories';
import { Movie } from 'src/domain/entities';
import { FindMovieByIdUseCase } from './find-movie-by-id.use-case';

export type EditMovieInputDTO = {
  name: string;
  description: string;
  releaseDate: Date;
  minimumAgeAllowed: number;
};

@Injectable()
export class EditMovieUseCase {
  constructor(
    private readonly repository: MovieRepository,
    private readonly findById: FindMovieByIdUseCase,
  ) {}

  async execute(input: EditMovieInputDTO, id: UUID): Promise<Movie> {
    const movie = await this.findById.execute(id);

    movie.name = input.name;
    movie.description = input.description;
    movie.releaseDate = input.releaseDate;
    movie.minimumAgeAllowed = input.minimumAgeAllowed;

    return await this.repository.save(movie);
  }
}
