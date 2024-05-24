import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieHttpRequest {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsNumber()
  @IsNotEmpty()
  minimumAgeAllowed: number;
  @IsDate()
  @IsNotEmpty()
  releaseDate: Date;
}
