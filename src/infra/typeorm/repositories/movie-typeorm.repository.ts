import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieRepository } from 'src/application/repositories';
import { Movie } from 'src/domain/entities';
import { Repository } from 'typeorm';
import { MovieTypeOrmModel } from '../models';

@Injectable()
export class MovieTypeOrmRepository implements MovieRepository {
  constructor(
    @InjectRepository(MovieTypeOrmModel)
    private readonly typeOrmRepository: Repository<MovieTypeOrmModel>,
  ) {}

  async save(movie: Movie): Promise<Movie> {
    const saved = await this.typeOrmRepository.save(
      MovieTypeOrmModel.fromEntity(movie),
    );

    return saved.toEntity();
  }

  async findByName(name: string): Promise<Movie> {
    const model = await this.typeOrmRepository.findOne({ where: { name } });

    if (!model) return null;

    return model.toEntity();
  }
}
