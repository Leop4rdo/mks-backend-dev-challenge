import { UUID } from 'crypto';

export class User {
  id: UUID;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
