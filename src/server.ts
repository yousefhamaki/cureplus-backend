import { env } from './config/env';
import { App } from './app';
import { BrevoEmailSender } from './traits/brevoEmailSender.trait';

const emailSender = new BrevoEmailSender(env.brevoApiKey, env.mailFromEmail, env.mailFromName);
const { app } = new App(emailSender);
const server = app.listen(env.port, () => console.log(`Server listening on port ${env.port}`));

process.on('SIGTERM', () => server.close());
