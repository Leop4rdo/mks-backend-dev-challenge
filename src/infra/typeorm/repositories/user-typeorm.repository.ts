import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/application/repositories';
import { User } from 'src/domain/entities';
import { Repository } from 'typeorm';
import { UserTypeOrmModel } from '../models/user-typeorm.model';

@Injectable()
export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserTypeOrmModel)
    private readonly typeOrmRepository: Repository<UserTypeOrmModel>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const model = await this.typeOrmRepository.findOne({
      where: {
        email,
      },
    });

    if (!model) return null;

    return model.toEntity();
  }

  async save(user: User): Promise<User> {
    const model = UserTypeOrmModel.fromEntity(user);

    return (await this.typeOrmRepository.save(model)).toEntity();
  }
}
