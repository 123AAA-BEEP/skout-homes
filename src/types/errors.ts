export interface DbError extends Error {
  code?: string;
  type: 'validation' | 'connection' | 'operation';
  cause?: Error;
}

export interface ApiError extends Error {
  code: string;
  status: number;
  details?: unknown;
}

export function createDbError(
  message: string,
  type: DbError['type'],
  originalError?: Error,
  code?: string
): DbError {
  const error = new Error(message) as DbError;
  error.type = type;
  if (originalError) {
    error.cause = originalError;
  }
  if (code) {
    error.code = code;
  }
  return error;
}

export function createApiError(
  message: string,
  status: number,
  code: string,
  details?: unknown
): ApiError {
  const error = new Error(message) as ApiError;
  error.status = status;
  error.code = code;
  if (details) {
    error.details = details;
  }
  return error;
} 