import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { IEmailSender } from '../interfaces/email.interface';
import { SendVerificationCodeService } from '../services/verification/sendVerificationCode.service';
import { SendVerificationCodeController } from '../controllers/verification/sendVerificationCode.controller';
import { ValidationMiddleware } from '../middleware/validation.middleware';
import { sendVerificationCodeSchema } from '../validation/verification/sendVerificationCode.validation';

export class VerificationRoute {
  readonly router = Router();

  constructor(private readonly emailSender: IEmailSender) {
    this.register();
  }

  private register(): void {
    // Public on purpose, so it is rate limited to stop it being used as a spam relay.
    const limiter = rateLimit({ windowMs: 60_000, limit: 5, standardHeaders: true, legacyHeaders: false });

    /**
     * @openapi
     * /api/verification/send:
     *   post:
     *     tags: [Verification]
     *     summary: Email a verification code to an address
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [email, code]
     *             properties:
     *               email: { type: string, format: email }
     *               code: { type: string, example: "483920" }
     *     responses:
     *       200: { description: Code sent }
     *       400: { description: Validation failed }
     *       429: { description: Too many requests }
     *       502: { description: Email provider failed }
     */
    this.router.post(
      '/send',
      limiter,
      ValidationMiddleware.validate(sendVerificationCodeSchema),
      new SendVerificationCodeController(new SendVerificationCodeService(this.emailSender)).handle
    );
  }
}
