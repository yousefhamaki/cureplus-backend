import { Request, Response } from 'express';
import Joi from 'joi';
import { ValidationMiddleware } from '../../src/middleware/validation.middleware';
import { ValidationError } from '../../src/errors/ValidationError';

describe('ValidationMiddleware', () => {
  const schema = Joi.object({ email: Joi.string().email().required() });

  it('passes valid bodies and replaces them with the sanitized value', () => {
    const req = { body: { email: 'a@test.com', extra: 1 } } as Request;
    const next = jest.fn();
    ValidationMiddleware.validate(schema)(req, {} as Response, next);
    expect(req.body).toEqual({ email: 'a@test.com' });
    expect(next).toHaveBeenCalledWith();
  });

  it('forwards a ValidationError for invalid bodies', () => {
    const next = jest.fn();
    ValidationMiddleware.validate(schema)({ body: {} } as Request, {} as Response, next);
    expect(next.mock.calls[0][0]).toBeInstanceOf(ValidationError);
  });
});
