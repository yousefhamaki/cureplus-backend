import { Transporter } from 'nodemailer';
import { EmailMessage, IEmailSender } from '../interfaces/email.interface';
import { EmailDeliveryError } from '../errors/EmailDeliveryError';

export class NodemailerEmailSender implements IEmailSender {
  constructor(
    private readonly transporter: Pick<Transporter, 'sendMail'>,
    private readonly from: string
  ) {}

  async send(message: EmailMessage): Promise<void> {
    try {
      await this.transporter.sendMail({ from: this.from, ...message });
    } catch (error) {
      console.error('Email delivery failed', error);
      throw new EmailDeliveryError();
    }
  }
}
