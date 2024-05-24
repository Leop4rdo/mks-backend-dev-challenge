import { UUID } from 'crypto';
import { Movie } from 'src/domain/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'movies' })
export class MovieTypeOrmModel {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('timestamp')
  releaseDate: Date;

  @Column({ name: 'minimum_age_allowed' })
  minimumAgeAllowed: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  static fromEntity(entity: Movie): MovieTypeOrmModel {
    const model = new MovieTypeOrmModel();

    model.id = entity.id;
    model.name = entity.name;
    model.description = entity.description;
    model.releaseDate = entity.releaseDate;
    model.minimumAgeAllowed = entity.minimumAgeAllowed;
    model.createdAt = entity.createdAt;
    model.updatedAt = entity.updatedAt;

    return model;
  }

  toEntity(): Movie {
    const entity = new Movie();

    entity.id = this.id;
    entity.name = this.name;
    entity.description = this.description;
    entity.releaseDate = this.releaseDate;
    entity.minimumAgeAllowed = this.minimumAgeAllowed;
    entity.createdAt = this.createdAt;
    entity.updatedAt = this.updatedAt;

    return entity;
  }
}
