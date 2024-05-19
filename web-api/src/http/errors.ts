import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../controllers/shared';

export class AuthenticationFault extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class AuthorizationFault extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class BusinessFault extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class ValidationFault extends Error {
  constructor(message: string) {
    super(message);
  }
}

export function handleErrors(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  let statusCode = 500;

  const apiResponse: ApiResponse<never> = {
    success: false,
    error: {
      type: 'InternalError',
      message: 'An unexpected error occurred, check logs for more information',
    },
  };

  if (error instanceof AuthenticationFault) {
    statusCode = 401;
    apiResponse.error = {
      type: AuthenticationFault.name,
      message: error.message,
    };
  }

  if (error instanceof AuthorizationFault) {
    statusCode = 403;
    apiResponse.error = {
      type: AuthorizationFault.name,
      message: error.message,
    };
  }

  if (error instanceof ValidationFault) {
    statusCode = 400;
    apiResponse.error = {
      type: ValidationFault.name,
      message: error.message,
    };
  }

  if (error instanceof BusinessFault) {
    statusCode = 400;
    apiResponse.error = {
      type: BusinessFault.name,
      message: error.message,
    };
  }

  console.error(error);

  return response.status(statusCode).json(apiResponse);
}
