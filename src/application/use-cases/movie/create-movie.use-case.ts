import { Injectable } from '@nestjs/common';
import { DuplicateResourceError } from 'src/application/errors';
import { MovieRepository } from 'src/application/repositories';
import { Movie } from 'src/domain/entities';

export type CreateMovieInputDTO = {
  name: string;
  description: string;
  minimumAgeAllowed: number;
  releaseDate: Date;
};

@Injectable()
export class CreateMovieUseCase {
  constructor(private readonly repository: MovieRepository) {}

  async execute(input: CreateMovieInputDTO): Promise<Movie> {
    await this.validateDuplicate(input.name);

    const movie = new Movie();
    movie.name = input.name;
    movie.description = input.description;
    movie.releaseDate = input.releaseDate;
    movie.minimumAgeAllowed = input.minimumAgeAllowed;

    return this.repository.save(movie);
  }

  private async validateDuplicate(name: string) {
    const existent = await this.repository.findByName(name);

    if (existent) throw new DuplicateResourceError('Movie', { name });
  }
}
