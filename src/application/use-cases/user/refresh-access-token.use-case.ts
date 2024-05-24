import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/application/repositories';
import { AuthenticationTokenService } from 'src/application/services';

export type RefreshAccessTokenInput = {
  refreshToken: string;
};
export type RefreshAccessTokenOutput = {
  accessToken: string;
};

@Injectable()
export class RefreshAccessTokenUseCase {
  constructor(
    private readonly tokenService: AuthenticationTokenService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    input: RefreshAccessTokenInput,
  ): Promise<RefreshAccessTokenOutput> {
    const userId = await this.tokenService.decodeRefreshToken(
      input.refreshToken,
    );

    const user = await this.userRepository.findById(userId);

    if (!user) throw new UnauthorizedException();

    const accessToken = await this.tokenService.generateAccessToken(user);

    return { accessToken };
  }
}
