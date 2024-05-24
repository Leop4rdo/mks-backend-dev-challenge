import { IsNotEmpty } from 'class-validator';

export class RefreshAccessTokenHttpRequest {
  @IsNotEmpty()
  refreshToken: string;
}
