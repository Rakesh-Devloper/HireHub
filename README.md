# HireHub

HireHub is a full-stack MERN job portal for job seekers, employers, and administrators.

## Stack

- React 19 + Vite
- Tailwind CSS 4
- Express + Node.js
- MongoDB + Mongoose
- JWT authentication
- Multer file uploads
- SMTP email / Gmail App Password support
- Recharts

## Run locally

Use the **project root** for the full-stack app.

1. Install Node.js 20+.
2. Copy `.env.example` to `.env`.
3. Fill in at least `MONGODB_URI` and `JWT_SECRET`.
4. For local demo data, set `SEED_DATABASE=true`.
5. Install dependencies:

```bash
npm install
```

6. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

The same Node process serves the Vite development frontend and the `/api` backend.

## Production build

```bash
npm install
npm run build
NODE_ENV=production npm start
```

Set these production environment variables on your hosting provider:

- `NODE_ENV=production`
- `PORT` (provided by most platforms)
- `MONGODB_URI`
- `JWT_SECRET`
- `CLIENT_URL` (your public app origin)
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`

Do **not** enable `SEED_DATABASE` in production unless you intentionally want the built-in demo dataset and understand the demo accounts it creates.

## Gmail password-reset email

Use a Google **App Password**, not your normal Gmail password.

- Enable 2-Step Verification on the Gmail account.
- Create a 16-character App Password for this application.
- Put that App Password in `SMTP_PASS`.
- Never commit `.env` or the App Password to Git.

## Deployment

The root `package.json` is the deployment entry point.

Build command:

```bash
npm run build
```

Start command:

```bash
npm start
```

The server reads the hosting platform's `PORT` environment variable and serves the production Vite build plus `/api`.

For a separate frontend/backend deployment, set the frontend `VITE_API_URL` to the public backend API URL and set the backend `CLIENT_URL` to the frontend origin.

## Security improvements included

- Protected employer and admin frontend routes.
- Server-side role checks remain authoritative.
- Removed client-side demo role switching and demo-token authentication bypass.
- Employer ownership is checked before viewing/updating applications.
- Company ownership is checked before editing company profiles.
- Password-reset OTP is not exposed in production responses.
- Production requires MongoDB instead of silently using in-memory storage.
- Production email configuration is required for password-reset delivery.
- Authentication tokens are cleared on any 401 response.
- Uploaded filenames are sanitized and file size is limited.

## Important

The development in-memory database is only for local testing. It is not persistent and should never be used for production data.
