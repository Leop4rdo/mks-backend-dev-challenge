import { Injectable } from '@nestjs/common';
import UserRepository from 'src/application/repositories/user.repository';
import { User } from 'src/domain/entities';

export type CreateUserUseCaseInputDTO = {
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(input: CreateUserUseCaseInputDTO): Promise<User> {
    const existentWithSameEmail = this.repository.findByEmail(input.email);
    if (existentWithSameEmail) throw new DuplicateResourceError(); // todo work in this exception

    return new Promise(null);
  }
}
