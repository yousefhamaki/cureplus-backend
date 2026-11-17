import { AppError } from './AppError';
import { ERROR_CODES } from '../constants/error.constants';

export class EmailDeliveryError extends AppError {
  constructor(message = 'Could not send the email', details?: unknown) {
    super(ERROR_CODES.EMAIL_DELIVERY_FAILED, message, 502, details);
  }
}
