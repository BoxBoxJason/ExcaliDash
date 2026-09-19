# Configuration

Configure ExcaliDash with environment variables. `backend/.env.example` lists the backend settings.

## Local development

Copy the example files before starting the services:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Use the defaults for local development. Keep secrets in untracked `.env` files.

## Docker Compose

Set variables in your shell or the root `.env` file:

```dotenv
EXCALIDASH_TAG=latest
AUTH_MODE=local
JWT_SECRET=replace-with-a-long-random-value
CSRF_SECRET=replace-with-a-different-random-value
```

Start the services:

```bash
docker compose -f docker-compose.prod.yml up -d
```

## Configuration rules

- Treat signing keys, database credentials, OIDC secrets, and mail credentials as secrets.
- Use the same image tag for the frontend and backend.
- Set `FRONTEND_URL` to the externally visible origin when the backend must allow cross-origin requests.
- Enable `TRUST_PROXY` only when a trusted proxy replaces client-supplied forwarding headers.
- Keep database and uploaded-file storage persistent across container replacement.

See the [environment reference](/reference/environment).
