import { UUID } from 'crypto';

export class Movie {
  id: UUID;
  name: string;
  description: string;
  releaseDate: Date;
  minimumAgeAllowed: number;
  createdAt: Date;
  updatedAt: Date;
}
