import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/application/repositories';
import { User } from 'src/domain/entities';

export type ListUsersFiltersInputDTO = {
  limit: number;
  page: number;
  search?: string;
};

export type ListUsersOutputDTO = {
  data: Array<User>;
  totalItens: number;
  totalPages: number;
};

@Injectable()
export class ListUsersUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(filter: ListUsersFiltersInputDTO): Promise<ListUsersOutputDTO> {
    return this.repository.listByFilters(filter);
  }
}
