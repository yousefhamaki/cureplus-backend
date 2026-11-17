import nodemailer from 'nodemailer';
import { env } from './config/env';
import { App } from './app';
import { NodemailerEmailSender } from './traits/nodemailerEmailSender.trait';

const transporter = nodemailer.createTransport({
  host: env.smtpHost,
  port: env.smtpPort,
  secure: env.smtpPort === 465,
  auth: { user: env.smtpUser, pass: env.smtpPass }
});

const { app } = new App(new NodemailerEmailSender(transporter, env.mailFrom));
const server = app.listen(env.port, () => console.log(`Server listening on port ${env.port}`));

process.on('SIGTERM', () => server.close());
