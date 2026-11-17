import { IService } from '../../interfaces/service.interface';
import { IEmailSender } from '../../interfaces/email.interface';
import { SendVerificationCodeRequestDto } from '../../dtos/verification/sendVerificationCodeRequest.dto';
import { SendVerificationCodeDto } from '../../dtos/verification/sendVerificationCode.dto';

export class SendVerificationCodeService
  implements IService<SendVerificationCodeRequestDto, SendVerificationCodeDto>
{
  constructor(private readonly emailSender: IEmailSender) {}

  async use({ email, code }: SendVerificationCodeRequestDto): Promise<SendVerificationCodeDto> {
    await this.emailSender.send({
      to: email,
      subject: 'Your verification code',
      text: `Your verification code is: ${code}`,
      html: `<p>Your verification code is:</p><h2 style="letter-spacing:4px">${code}</h2>`
    });
    return new SendVerificationCodeDto(email);
  }
}
