import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { AppError } from './appError';
import { ErrorCodes } from './errorCodes';
import { env } from '../config/env';

export function errorHandler(
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const isProduction = env.NODE_ENV === 'production';

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      error: {
        code: error.code,
        message: error.message,
        ...(error.details && { details: error.details }),
      },
    });
  }

  if (error.validation) {
    const details = error.validation.map((v) => ({
      field: v.instancePath?.replace('/', '') || v.params?.missingProperty,
      message: v.message ?? 'Invalid value',
    }));

    return reply.status(400).send({
      error: {
        code: ErrorCodes.VALIDATION_ERROR,
        message: 'Validation failed',
        details,
      },
    });
  }

  if (!isProduction) {
    _request.log.error(error);
  }

  return reply.status(error.statusCode ?? 500).send({
    error: {
      code: ErrorCodes.INTERNAL_ERROR,
      message: isProduction ? 'An unexpected error occurred' : error.message,
    },
  });
}
