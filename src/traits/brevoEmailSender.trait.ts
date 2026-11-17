import { EmailMessage, IEmailSender } from '../interfaces/email.interface';
import { EmailDeliveryError } from '../errors/EmailDeliveryError';

export type FetchFn = typeof fetch;

/** Sends through Brevo's HTTPS API (works on hosts that block SMTP ports). */
export class BrevoEmailSender implements IEmailSender {
  private static readonly URL = 'https://api.brevo.com/v3/smtp/email';

  constructor(
    private readonly apiKey: string,
    private readonly fromEmail: string,
    private readonly fromName: string,
    private readonly fetchFn: FetchFn = fetch
  ) {}

  async send(message: EmailMessage): Promise<void> {
    try {
      const response = await this.fetchFn(BrevoEmailSender.URL, {
        method: 'POST',
        headers: { 'api-key': this.apiKey, 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          sender: { name: this.fromName, email: this.fromEmail },
          to: [{ email: message.to }],
          subject: message.subject,
          textContent: message.text,
          htmlContent: message.html
        })
      });
      if (!response.ok) {
        throw new Error(`Brevo responded ${response.status}: ${await response.text()}`);
      }
    } catch (error) {
      console.error('Email delivery failed', error);
      throw new EmailDeliveryError();
    }
  }
}
