import { Injectable } from '@nestjs/common';
import { AuthenticationTokenService } from 'src/application/services';

export type RefreshAccessTokenInput = {
  refreshToken: string;
};
export type RefreshAccessTokenOutput = {
  accessToken: string;
};

@Injectable()
export class RefreshAccessTokenUseCase {
  constructor(private readonly tokenService: AuthenticationTokenService) {}

  async execute(
    input: RefreshAccessTokenInput,
  ): Promise<RefreshAccessTokenOutput> {
    return new Promise(null);
  }
}
