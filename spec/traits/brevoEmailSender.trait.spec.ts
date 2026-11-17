import { BrevoEmailSender, FetchFn } from '../../src/traits/brevoEmailSender.trait';
import { EmailDeliveryError } from '../../src/errors/EmailDeliveryError';

describe('BrevoEmailSender', () => {
  const message = { to: 'a@test.com', subject: 's', text: 't', html: '<p>t</p>' };
  const sender = (fetchFn: jest.Mock) => new BrevoEmailSender('key', 'from@test.com', 'CurePlus', fetchFn as unknown as FetchFn);

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  it('posts the message to Brevo with the api key', async () => {
    const fetchFn = jest.fn().mockResolvedValue({ ok: true });
    await sender(fetchFn).send(message);

    const [url, init] = fetchFn.mock.calls[0];
    expect(url).toBe('https://api.brevo.com/v3/smtp/email');
    expect(init.headers['api-key']).toBe('key');
    expect(JSON.parse(init.body)).toEqual({
      sender: { name: 'CurePlus', email: 'from@test.com' },
      to: [{ email: 'a@test.com' }],
      subject: 's',
      textContent: 't',
      htmlContent: '<p>t</p>'
    });
  });

  it('throws EmailDeliveryError when Brevo answers with an error status', async () => {
    const fetchFn = jest.fn().mockResolvedValue({ ok: false, status: 401, text: async () => 'unauthorized' });
    await expect(sender(fetchFn).send(message)).rejects.toBeInstanceOf(EmailDeliveryError);
  });

  it('throws EmailDeliveryError when the request fails', async () => {
    const fetchFn = jest.fn().mockRejectedValue(new Error('network'));
    await expect(sender(fetchFn).send(message)).rejects.toBeInstanceOf(EmailDeliveryError);
  });
});
