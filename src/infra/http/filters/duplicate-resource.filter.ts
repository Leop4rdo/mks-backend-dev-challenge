import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { DuplicateResourceError } from 'src/application/errors';

@Catch(DuplicateResourceError)
export class DuplicateResourceFilter implements ExceptionFilter {
  catch(exception: DuplicateResourceError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    response.status(409).json({
      error: exception.message,
      details: {
        resourceName: exception.resourceName,
        criteria: exception.criteria,
      },
    });
  }
}
