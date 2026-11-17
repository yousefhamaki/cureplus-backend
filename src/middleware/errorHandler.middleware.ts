import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { ERROR_CODES } from '../constants/error.constants';

export class ErrorHandlerMiddleware {
  handle = (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({
        success: false,
        error: { code: err.code, message: err.message, details: err.details }
      });
      return;
    }
    console.error(err);
    res.status(500).json({
      success: false,
      error: { code: ERROR_CODES.INTERNAL_ERROR, message: 'Internal server error' }
    });
  };
}
