import { Injectable } from '@nestjs/common';
import { DuplicateResourceError } from 'src/application/errors';
import { UserRepository } from 'src/application/repositories';
import { HashService } from 'src/application/services';
import { User } from 'src/domain/entities';

export type CreateUserUseCaseInputDTO = {
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly repository: UserRepository,
    private readonly hashService: HashService,
  ) {}

  async execute(input: CreateUserUseCaseInputDTO): Promise<User> {
    await this.validateDuplicateEmail(input.email.toLowerCase());

    const user = new User();
    user.name = input.name;
    user.email = input.email.toLowerCase();
    user.password = await this.hashService.hash(input.password);

    return await this.repository.save(user);
  }

  async validateDuplicateEmail(email: string) {
    const existentWithSameEmail = await this.repository.findByEmail(email);

    if (existentWithSameEmail)
      throw new DuplicateResourceError(User.constructor.name, { email });
  }
}
