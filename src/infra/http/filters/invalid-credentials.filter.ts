import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { InvalidCredentialsError } from 'src/application/errors';

@Catch(InvalidCredentialsError)
export class InvalidCredentialsFilter implements ExceptionFilter {
  catch(exception: InvalidCredentialsError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    response.status(400).json({
      error: exception.message,
    });
  }
}
