import { UUID } from 'crypto';
import { User } from 'src/domain/entities';
import {
  ListUsersFiltersInputDTO,
  ListUsersOutputDTO,
} from '../use-cases/user';

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract save(user: User): Promise<User>;
  abstract findById(id: UUID): Promise<User | null>;
  abstract listByFilters(
    filters: ListUsersFiltersInputDTO,
  ): Promise<ListUsersOutputDTO>;
}
