import { NodemailerEmailSender } from '../../src/traits/nodemailerEmailSender.trait';
import { EmailDeliveryError } from '../../src/errors/EmailDeliveryError';

describe('NodemailerEmailSender', () => {
  const message = { to: 'a@test.com', subject: 's', text: 't', html: '<p>t</p>' };

  it('sends the message with the configured from address', async () => {
    const transporter = { sendMail: jest.fn().mockResolvedValue({}) };
    await new NodemailerEmailSender(transporter, 'from@test.com').send(message);
    expect(transporter.sendMail).toHaveBeenCalledWith({ from: 'from@test.com', ...message });
  });

  it('wraps transport failures in EmailDeliveryError', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const transporter = { sendMail: jest.fn().mockRejectedValue(new Error('smtp down')) };
    await expect(new NodemailerEmailSender(transporter, 'from@test.com').send(message)).rejects.toBeInstanceOf(
      EmailDeliveryError
    );
  });
});
