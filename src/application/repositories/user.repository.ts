import { User } from 'src/domain/entities';

export default interface UserRepository {
  findByEmail(email: string): Promise<User>;
}
