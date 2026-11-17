import dotenv from 'dotenv';
dotenv.config();

const required = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var ${key}`);
  return value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000),
  smtpHost: required('SMTP_HOST'),
  smtpPort: Number(process.env.SMTP_PORT ?? 465),
  smtpUser: required('SMTP_USER'),
  smtpPass: required('SMTP_PASS'),
  mailFrom: required('MAIL_FROM')
};
