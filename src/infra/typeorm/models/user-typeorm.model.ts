import { UUID } from 'crypto';
import { User } from 'src/domain/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserTypeOrmModel {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  name: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static fromEntity(entity: User): UserTypeOrmModel {
    const model = new UserTypeOrmModel();

    model.id = entity.id;
    model.name = entity.name;
    model.email = entity.password;
    model.password = entity.password;
    model.createdAt = entity.createdAt;
    model.updatedAt = entity.updatedAt;

    return model;
  }

  toEntity(): User {
    const entity = new User();

    entity.id = this.id;
    entity.name = this.name;
    entity.email = this.email;
    entity.password = this.password;
    entity.createdAt = this.createdAt;
    entity.updatedAt = this.updatedAt;

    return entity;
  }
}
