# cureplus-backend

Express + TypeScript API that emails a verification code.

## Run
1. `npm install`
2. Copy `.env.example` to `.env` and fill in the SMTP values
3. `npm run dev`

Swagger docs: http://localhost:3000/docs

## Endpoint
`POST /api/verification/send` with `{ "email": "...", "code": "..." }` (rate limited to 5/min per IP)

## Scripts
`npm test`, `npm run typecheck`, `npm run build`, `npm start`
