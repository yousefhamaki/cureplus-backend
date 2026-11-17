import { Request, Response, NextFunction } from 'express';
import { IService } from '../../interfaces/service.interface';
import { SendVerificationCodeRequestDto } from '../../dtos/verification/sendVerificationCodeRequest.dto';
import { SendVerificationCodeDto } from '../../dtos/verification/sendVerificationCode.dto';

export class SendVerificationCodeController {
  constructor(private readonly service: IService<SendVerificationCodeRequestDto, SendVerificationCodeDto>) {}

  handle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.use(req.body as SendVerificationCodeRequestDto);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };
}
