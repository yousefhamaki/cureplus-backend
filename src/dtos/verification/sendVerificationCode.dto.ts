export class SendVerificationCodeDto {
  readonly message: string;
  readonly email: string;

  constructor(email: string) {
    this.message = 'Verification code sent';
    this.email = email;
  }
}
