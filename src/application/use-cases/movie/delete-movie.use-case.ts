import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { MovieRepository } from 'src/application/repositories';
import { FindMovieByIdUseCase } from './find-movie-by-id.use-case';

@Injectable()
export class DeleteMovieUseCase {
  constructor(
    private readonly repository: MovieRepository,
    private readonly findById: FindMovieByIdUseCase,
  ) {}

  async execute(id: UUID): Promise<void> {
    await this.findById.execute(id);
    await this.repository.deleteById(id);
  }
}
