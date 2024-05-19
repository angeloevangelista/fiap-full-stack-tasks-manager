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
  messages: string[];

  constructor(...messages: string[]) {
    super(messages.join(', '));
    this.messages = messages;
  }
}

export class MissingResourceFault extends Error {
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
      messages: [
        'An unexpected error occurred, check logs for more information',
      ],
    },
  };

  if (error instanceof AuthenticationFault) {
    statusCode = 401;
    apiResponse.error = {
      type: AuthenticationFault.name,
      messages: [error.message],
    };
  }

  if (error instanceof AuthorizationFault) {
    statusCode = 403;
    apiResponse.error = {
      type: AuthorizationFault.name,
      messages: [error.message],
    };
  }

  if (error instanceof ValidationFault) {
    statusCode = 400;
    apiResponse.error = {
      type: ValidationFault.name,
      messages: error.messages,
    };
  }

  if (error instanceof BusinessFault) {
    statusCode = 400;
    apiResponse.error = {
      type: BusinessFault.name,
      messages: [error.message],
    };
  }

  if (error instanceof MissingResourceFault) {
    statusCode = 404;
    apiResponse.error = {
      type: MissingResourceFault.name,
      messages: [error.message],
    };
  }

  if (statusCode === 500) {
    console.error(error);
  }

  return response.status(statusCode).json(apiResponse);
}
