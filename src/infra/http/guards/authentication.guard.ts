import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthenticationTokenService } from 'src/application/services';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly tokenService: AuthenticationTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    try {
      const decoded = await this.tokenService.decodeAccessToken(token);
      request['_authenticatedUser'] = decoded;

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  extractToken(request: Request): string {
    if (!request.headers.authorization) throw new UnauthorizedException();

    const [type, token] = request.headers.authorization.split(' ');

    if (type !== 'Bearer' || !token) throw new UnauthorizedException();

    return token;
  }
}
