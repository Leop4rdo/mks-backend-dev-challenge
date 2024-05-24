import { Injectable } from '@nestjs/common';
import { MovieRepository } from 'src/application/repositories';
import { Movie } from 'src/domain/entities';

export type ListMoviesOutputDTO = {
  data: Array<Movie>;
  total: number;
};

export type ListMoviesFiltersInputDTO = {
  limit: number;
  page: number;
  name?: string;
};

@Injectable()
export class ListMoviesUseCase {
  constructor(private readonly repository: MovieRepository) {}

  async execute(
    filters: ListMoviesFiltersInputDTO,
  ): Promise<ListMoviesOutputDTO> {
    return this.repository.listByFilters(filters);
  }
}
