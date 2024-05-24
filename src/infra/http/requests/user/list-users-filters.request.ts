import { IsNumber } from 'class-validator';

export class ListUsersFiltersHttpRequest {
  @IsNumber({ maxDecimalPlaces: 0 })
  limit = 32;

  @IsNumber({ maxDecimalPlaces: 0 })
  page = 1;

  search?: string;
}
