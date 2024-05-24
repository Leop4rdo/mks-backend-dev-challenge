import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { UserRepository } from 'src/application/repositories';
import {
  ListUsersFiltersInputDTO,
  ListUsersOutputDTO,
} from 'src/application/use-cases/user';
import { User } from 'src/domain/entities';
import { ILike, Repository } from 'typeorm';
import { UserTypeOrmModel } from '../models/user-typeorm.model';

@Injectable()
export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserTypeOrmModel)
    private readonly typeOrmRepository: Repository<UserTypeOrmModel>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const model = await this.typeOrmRepository.findOne({
      where: {
        email,
      },
    });

    if (!model) return null;

    return model.toEntity();
  }

  async save(user: User): Promise<User> {
    const model = UserTypeOrmModel.fromEntity(user);

    return (await this.typeOrmRepository.save(model)).toEntity();
  }

  async findById(id: UUID): Promise<User | null> {
    const model = await this.typeOrmRepository.findOne({ where: { id } });

    if (!model) return null;

    return model.toEntity();
  }

  async listByFilters(
    filters: ListUsersFiltersInputDTO,
  ): Promise<ListUsersOutputDTO> {
    const page = filters.page <= 1 ? 1 : filters.page + -1;

    const [models, total] = await this.typeOrmRepository.findAndCount({
      where: {
        email: filters.search ? ILike(`%${filters.search}%`) : undefined,
        name: filters.search ? ILike(`%${filters.search}%`) : undefined,
      },
      skip: page === 1 ? 0 : filters.limit * (page - 1),
      take: filters.limit,
    });

    return {
      data: models.map((model) => model.toEntity()),
      total: total,
    };
  }
}
