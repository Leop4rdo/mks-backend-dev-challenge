import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { ResourceNotFound } from 'src/application/errors/resource-not-found.error';
import { MovieRepository } from 'src/application/repositories';
import { Movie } from 'src/domain/entities';

@Injectable()
export class FindMovieByIdUseCase {
  constructor(private readonly repository: MovieRepository) {}

  async execute(id: UUID): Promise<Movie> {
    const movie = this.repository.findById(id);

    if (!movie) throw new ResourceNotFound('Movie', { id });

    return movie;
  }
}
