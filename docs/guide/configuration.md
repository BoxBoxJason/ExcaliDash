# Configuration

ExcaliDash is configured through environment variables. The backend registry in `backend/src/config/registry/` is the canonical definition; `backend/.env.example` is generated from it.

## Local development

Copy the example files before starting the services:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

The committed defaults are suitable for local development. Add secrets only to the untracked `.env` files.

## Docker Compose

Compose substitutes values from your shell or a root `.env` file. For example:

```dotenv
EXCALIDASH_TAG=latest
AUTH_MODE=local
JWT_SECRET=replace-with-a-long-random-value
CSRF_SECRET=replace-with-a-different-random-value
```

Then start the stack normally:

```bash
docker compose -f docker-compose.prod.yml up -d
```

## Configuration rules

- Treat signing keys, database credentials, OIDC secrets, and mail credentials as secrets.
- Use the same image tag for the frontend and backend.
- Set `FRONTEND_URL` to the externally visible origin when the backend must allow cross-origin requests.
- Enable `TRUST_PROXY` only when a trusted proxy replaces client-supplied forwarding headers.
- Keep database and uploaded-file storage persistent across container replacement.

See the [environment reference](/reference/environment) for the most important settings and their source of truth.
