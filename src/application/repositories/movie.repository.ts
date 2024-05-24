import { Movie } from 'src/domain/entities';

export abstract class MovieRepository {
  abstract findByName(name: string): Promise<Movie | null>;
  abstract save(movie: Movie): Promise<Movie>;
}
