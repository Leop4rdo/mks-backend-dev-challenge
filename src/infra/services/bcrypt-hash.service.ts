import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HashService } from 'src/application/services';
import { hash } from 'bcrypt';

@Injectable()
export class BcryptHashService implements HashService {
  constructor(private readonly config: ConfigService) {}

  async hash(value: string): Promise<string> {
    return await hash(value, this.config.get('HASH.SALT') ?? 10);
  }
}
