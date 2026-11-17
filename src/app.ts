import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { IEmailSender } from './interfaces/email.interface';
import { ApiRouter } from './routes';
import { ErrorHandlerMiddleware } from './middleware/errorHandler.middleware';
import { NotFoundError } from './errors/NotFoundError';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

export class App {
  readonly app: Express = express();

  constructor(emailSender: IEmailSender) {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.get('/health', (_req, res) => {
      res.json({ success: true, data: { status: 'ok' } });
    });
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.app.get('/docs.json', (_req, res) => {
      res.json(swaggerSpec);
    });
    this.app.use('/api', new ApiRouter(emailSender).router);
    this.app.use((_req: Request, _res: Response, next: NextFunction) => next(new NotFoundError('Route not found')));
    this.app.use(new ErrorHandlerMiddleware().handle);
  }
}
