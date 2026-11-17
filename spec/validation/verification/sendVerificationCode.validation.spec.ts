import { sendVerificationCodeSchema } from '../../../src/validation/verification/sendVerificationCode.validation';

describe('sendVerificationCodeSchema', () => {
  const valid = { email: 'a@test.com', code: '123456' };

  it('accepts a valid payload', () => {
    expect(sendVerificationCodeSchema.validate(valid).error).toBeUndefined();
  });

  it.each([
    ['missing email', { ...valid, email: undefined }],
    ['bad email', { ...valid, email: 'nope' }],
    ['missing code', { ...valid, code: undefined }],
    ['code too short', { ...valid, code: '12' }],
    ['code with html', { ...valid, code: '<b>1234</b>' }]
  ])('rejects %s', (_label, payload) => {
    expect(sendVerificationCodeSchema.validate(payload).error).toBeDefined();
  });
});
