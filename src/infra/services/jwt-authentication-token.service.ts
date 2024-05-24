import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UUID } from 'crypto';
import { AuthenticationTokenService } from 'src/application/services';
import { User } from 'src/domain/entities';

@Injectable()
export class JwtAuthenticationTokenService
  implements AuthenticationTokenService
{
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async generateAccessToken(user: User): Promise<string> {
    return await this.jwt.signAsync(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      {
        secret: this.config.getOrThrow<string>('JWT.SECRET'),
        issuer: this.config.getOrThrow<string>('JWT.ISSUER'),
        subject: user.id,
        expiresIn:
          this.config.get<string>('JWT.ACCESS_TOKEN.EXPIRES_IN') ?? '15m',
      },
    );
  }

  async generateRefreshToken(userId: UUID): Promise<string> {
    return await this.jwt.signAsync(
      {
        id: userId,
      },
      {
        secret: this.config.getOrThrow<string>('JWT.SECRET'),
        issuer: this.config.getOrThrow<string>('JWT.ISSUER'),
        subject: userId,
        expiresIn:
          this.config.get<string>('JWT.REFRESH_TOKEN.EXPIRES_IN') ?? '7d',
      },
    );
  }
}
