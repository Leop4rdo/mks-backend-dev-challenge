import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UUID } from 'crypto';
import {
  AccessTokenPayload,
  AuthenticationTokenService,
} from 'src/application/services';
import { User } from 'src/domain/entities';

@Injectable()
export class JwtAuthenticationTokenService
  implements AuthenticationTokenService
{
  private readonly SECRET: string;
  private readonly ISSUER: string;
  private readonly ACCESS_TOKEN_EXPIRES_IN: string;
  private readonly REFRESH_TOKEN_EXPIRES_IN: string;

  constructor(private readonly jwt: JwtService, config: ConfigService) {
    this.SECRET = config.getOrThrow<string>('JWT.SECRET');
    this.ISSUER = config.getOrThrow<string>('JWT.ISSUER');
    this.ACCESS_TOKEN_EXPIRES_IN =
      config.get<string>('JWT.ACCESS_TOKEN.EXPIRES_IN') ?? '15m';
    this.REFRESH_TOKEN_EXPIRES_IN =
      config.get<string>('JWT.REFRESH_TOKEN.EXPIRES_IN') ?? '2d';
  }

  async generateAccessToken(user: User): Promise<string> {
    return await this.jwt.signAsync(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      {
        secret: this.SECRET,
        issuer: this.ISSUER,
        subject: user.id,
        expiresIn: this.ACCESS_TOKEN_EXPIRES_IN,
      },
    );
  }

  async generateRefreshToken(userId: UUID): Promise<string> {
    return await this.jwt.signAsync(
      {
        id: userId,
      },
      {
        secret: this.SECRET,
        issuer: this.ISSUER,
        subject: userId,
        expiresIn: this.REFRESH_TOKEN_EXPIRES_IN,
      },
    );
  }

  async decodeAccessToken(accessToken: string): Promise<AccessTokenPayload> {
    return await this.jwt.verifyAsync(accessToken, {
      secret: this.SECRET,
      issuer: this.ISSUER,
    });
  }

  async decodeRefreshToken(refreshToken: string): Promise<UUID> {
    const decoded = await this.jwt.verifyAsync(refreshToken, {
      secret: this.SECRET,
      issuer: this.ISSUER,
    });

    return decoded.id;
  }
}
