import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { ResourceNotFound } from 'src/application/errors/resource-not-found.error';

@Catch(ResourceNotFound)
export class ResourceNotFoundFilter implements ExceptionFilter {
  catch(exception: ResourceNotFound, host: ArgumentsHost) {
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
