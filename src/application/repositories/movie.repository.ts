import { UUID } from 'crypto';
import { Movie } from 'src/domain/entities';
import {
  ListMoviesFiltersInputDTO,
  ListMoviesOutputDTO,
} from '../use-cases/movie';

export abstract class MovieRepository {
  abstract findByName(name: string): Promise<Movie | null>;
  abstract save(movie: Movie): Promise<Movie>;
  abstract listByFilters(
    filters: ListMoviesFiltersInputDTO,
  ): Promise<ListMoviesOutputDTO>;
  abstract findById(id: UUID): Promise<Movie | null>;
  abstract deleteById(id: UUID): Promise<void>;
}
