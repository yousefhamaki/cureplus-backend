import Joi from 'joi';
import { SendVerificationCodeRequestDto } from '../../dtos/verification/sendVerificationCodeRequest.dto';

export const sendVerificationCodeSchema = Joi.object<SendVerificationCodeRequestDto>({
  email: Joi.string().trim().lowercase().email().required(),
  code: Joi.string().trim().pattern(/^[A-Za-z0-9]{4,10}$/).required()
});
