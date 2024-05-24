import { UUID } from 'crypto';
import { User } from 'src/domain/entities';

export class UserHttpResponse {
  id: UUID;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  static fromEntity(entity: User): UserHttpResponse {
    const response = new UserHttpResponse();

    response.id = entity.id;
    response.name = entity.name;
    response.email = entity.email;
    response.createdAt = entity.createdAt;
    response.updatedAt = entity.updatedAt;

    return response;
  }
}
