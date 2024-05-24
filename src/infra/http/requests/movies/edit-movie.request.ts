import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class EditMovieHttpRequest {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsNotEmpty()
  minimumAgeAllowed: number;
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  releaseDate: Date;
}
