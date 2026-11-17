import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.3',
    info: { title: 'CurePlus API', version: '1.0.0', description: 'Email verification code API' },
    servers: [{ url: '/' }]
  },
  // .ts when running with ts-node-dev, .js after `npm run build`
  apis: [path.join(__dirname, '../routes/*.{ts,js}').replace(/\\/g, '/')]
});
