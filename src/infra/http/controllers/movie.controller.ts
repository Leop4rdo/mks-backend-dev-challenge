import { Controller, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '../guards/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('movies')
export class MovieController {}
