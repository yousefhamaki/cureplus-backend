import { Router } from 'express';
import { IEmailSender } from '../interfaces/email.interface';
import { VerificationRoute } from './verification.route';

export class ApiRouter {
  readonly router = Router();

  constructor(emailSender: IEmailSender) {
    this.router.use('/verification', new VerificationRoute(emailSender).router);
  }
}
