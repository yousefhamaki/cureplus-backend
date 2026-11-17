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
  brevoApiKey: required('BREVO_API_KEY'),
  mailFromEmail: required('MAIL_FROM_EMAIL'),
  mailFromName: process.env.MAIL_FROM_NAME ?? 'CurePlus'
};
