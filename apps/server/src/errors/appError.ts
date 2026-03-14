import { ErrorCode } from './errorCodes';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly details?: { field?: string; message: string }[];

  constructor(
    statusCode: number,
    code: ErrorCode,
    message: string,
    details?: { field?: string; message: string }[]
  ) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}
