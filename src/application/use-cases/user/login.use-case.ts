import { Injectable } from '@nestjs/common';
import { InvalidCredentialsError } from 'src/application/errors';
import { UserRepository } from 'src/application/repositories';
import {
  AuthenticationTokenService,
  HashService,
} from 'src/application/services';

export type LoginInputDTO = {
  email: string;
  password: string;
};

export type LoginOutputDTO = {
  acessToken: string;
  refreshToken: string;
};

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly repository: UserRepository,
    private readonly hashService: HashService,
    private readonly tokenService: AuthenticationTokenService,
  ) {}

  async execute(input: LoginInputDTO): Promise<LoginOutputDTO> {
    const user = await this.repository.findByEmail(input.email.toLowerCase());

    if (!user) throw new InvalidCredentialsError();

    if (!(await this.hashService.matches(input.password, user.password)))
      throw new InvalidCredentialsError();

    const [acessToken, refreshToken] = await Promise.all([
      this.tokenService.generateAccessToken(user),
      this.tokenService.generateRefreshToken(user.id),
    ]);

    return {
      acessToken,
      refreshToken,
    };
  }
}
