import { UUID } from 'crypto';
import { User } from 'src/domain/entities';

export type AccessTokenPayload = {
  id: UUID;
  email: string;
  name: string;
};

export abstract class AuthenticationTokenService {
  abstract generateAccessToken(user: User): Promise<string>;
  abstract generateRefreshToken(userId: UUID): Promise<string>;
  abstract decodeAccessToken(accessToken: string): Promise<AccessTokenPayload>;
  abstract decodeRefreshToken(refreshToken: string): Promise<UUID>;
}
