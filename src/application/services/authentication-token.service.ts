import { UUID } from 'crypto';
import { User } from 'src/domain/entities';

export abstract class AuthenticationTokenService {
  abstract generateAccessToken(user: User): Promise<string>;
  abstract generateRefreshToken(userId: UUID): Promise<string>;
}
