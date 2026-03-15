import { describe, it, expect } from 'vitest';
import { AppError } from './appError';
import { ErrorCodes } from './errorCodes';

describe('AppError', () => {
  it('creates error with statusCode, code, and message', () => {
    const err = new AppError(404, ErrorCodes.NOT_FOUND, 'Not found');
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe('AppError');
    expect(err.statusCode).toBe(404);
    expect(err.code).toBe('NOT_FOUND');
    expect(err.message).toBe('Not found');
    expect(err.details).toBeUndefined();
  });

  it('includes details when provided', () => {
    const details = [{ field: 'text', message: 'Required' }];
    const err = new AppError(400, ErrorCodes.VALIDATION_ERROR, 'Validation failed', details);
    expect(err.details).toEqual(details);
  });
});
