import { Request, Response } from 'express';
import { ErrorHandlerMiddleware } from '../../src/middleware/errorHandler.middleware';
import { NotFoundError } from '../../src/errors/NotFoundError';

const mockRes = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('ErrorHandlerMiddleware', () => {
  const handler = new ErrorHandlerMiddleware();

  it('maps AppError to its status and code', () => {
    const res = mockRes();
    handler.handle(new NotFoundError('nope'), {} as Request, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, error: expect.objectContaining({ code: 'NOT_FOUND', message: 'nope' }) })
    );
  });

  it('hides unknown errors behind a 500', () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const res = mockRes();
    handler.handle(new Error('secret'), {} as Request, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Internal server error' }
    });
  });
});
