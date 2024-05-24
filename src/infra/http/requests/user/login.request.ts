import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginHttpRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
