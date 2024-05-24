import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { MovieRepository } from 'src/application/repositories';
import {
  ListMoviesFiltersInputDTO,
  ListMoviesOutputDTO,
} from 'src/application/use-cases/movie';
import { Movie } from 'src/domain/entities';
import { ILike, Repository } from 'typeorm';
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

  async listByFilters(
    filters: ListMoviesFiltersInputDTO,
  ): Promise<ListMoviesOutputDTO> {
    const page = filters.page <= 1 ? 1 : filters.page + -1;

    const [models, total] = await this.typeOrmRepository.findAndCount({
      where: {
        name: filters.name ? ILike(`%${filters.name}%`) : undefined,
      },
      skip: page === 1 ? 0 : filters.limit * (page - 1),
      take: filters.limit,
    });

    return {
      data: models.map((model) => model.toEntity()),
      total: total,
    };
  }

  async findById(id: UUID): Promise<Movie> {
    const model = await this.typeOrmRepository.findOne({ where: { id } });

    if (!model) return null;

    return model.toEntity();
  }

  async deleteById(id: UUID): Promise<void> {
    await this.typeOrmRepository.delete({ id });
  }
}
