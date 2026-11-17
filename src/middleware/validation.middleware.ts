import { RequestHandler } from 'express';
import Joi from 'joi';
import { ValidationError } from '../errors/ValidationError';

export class ValidationMiddleware {
  static validate(schema: Joi.ObjectSchema): RequestHandler {
    return (req, _res, next) => {
      const { value, error } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
      if (error) {
        return next(
          new ValidationError(
            'Validation failed',
            error.details.map((d) => ({ field: d.path.join('.'), message: d.message }))
          )
        );
      }
      req.body = value;
      next();
    };
  }
}
