import { SendVerificationCodeService } from '../../../src/services/verification/sendVerificationCode.service';
import { SendVerificationCodeDto } from '../../../src/dtos/verification/sendVerificationCode.dto';
import { EmailDeliveryError } from '../../../src/errors/EmailDeliveryError';

describe('SendVerificationCodeService', () => {
  it('sends the code to the given email and returns a DTO', async () => {
    const sender = { send: jest.fn().mockResolvedValue(undefined) };
    const result = await new SendVerificationCodeService(sender).use({ email: 'a@test.com', code: '123456' });

    expect(sender.send).toHaveBeenCalledWith(
      expect.objectContaining({ to: 'a@test.com', text: expect.stringContaining('123456'), html: expect.stringContaining('123456') })
    );
    expect(result).toBeInstanceOf(SendVerificationCodeDto);
    expect(result.email).toBe('a@test.com');
  });

  it('propagates delivery errors', async () => {
    const sender = { send: jest.fn().mockRejectedValue(new EmailDeliveryError()) };
    await expect(new SendVerificationCodeService(sender).use({ email: 'a@test.com', code: '123456' })).rejects.toBeInstanceOf(
      EmailDeliveryError
    );
  });
});
