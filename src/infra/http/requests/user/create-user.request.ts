import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserHttpRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
