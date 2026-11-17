import { Request, Response } from 'express';
import { SendVerificationCodeController } from '../../../src/controllers/verification/sendVerificationCode.controller';

const mockRes = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('SendVerificationCodeController', () => {
  it('responds 200 with the service result', async () => {
    const service = { use: jest.fn().mockResolvedValue({ message: 'ok' }) };
    const res = mockRes();
    const next = jest.fn();
    const body = { email: 'a@test.com', code: '123456' };

    await new SendVerificationCodeController(service).handle({ body } as Request, res, next);

    expect(service.use).toHaveBeenCalledWith(body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: { message: 'ok' } });
    expect(next).not.toHaveBeenCalled();
  });

  it('forwards service errors to next', async () => {
    const error = new Error('boom');
    const service = { use: jest.fn().mockRejectedValue(error) };
    const next = jest.fn();

    await new SendVerificationCodeController(service).handle({ body: {} } as Request, mockRes(), next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
