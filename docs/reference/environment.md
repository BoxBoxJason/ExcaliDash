# Environment reference

Common settings are listed below. See `backend/src/config/registry/` for all variables, defaults, and validation rules.

## Core server

| Variable       | Default       | Purpose                                                              |
| -------------- | ------------- | -------------------------------------------------------------------- |
| `PORT`         | `8000`        | Backend HTTP port                                                    |
| `NODE_ENV`     | `development` | Enables production validation and hardening when set to `production` |
| `FRONTEND_URL` | unset         | Comma-separated allowed frontend origins                             |
| `TRUST_PROXY`  | `false`       | Express proxy trust; use a positive hop count behind a trusted proxy |

## Data

| Variable                  | Default                        | Purpose                                  |
| ------------------------- | ------------------------------ | ---------------------------------------- |
| `DATABASE_PROVIDER`       | `sqlite` in production Compose | Selects `sqlite` or `postgresql`         |
| `DATABASE_URL`            | local SQLite file              | Prisma connection string                 |
| `SNAPSHOT_RETENTION_DAYS` | `2`                            | Drawing snapshot retention period        |
| `UPLOAD_MAX_MB`           | `100`                          | Import and database-restore upload limit |
| `FILE_UPLOAD_MAX_MB`      | `100`                          | Per-image upload limit                   |

## Authentication

| Variable                 | Default                                 | Purpose                                                    |
| ------------------------ | --------------------------------------- | ---------------------------------------------------------- |
| `AUTH_MODE`              | `local`                                 | `local`, `hybrid`, `oidc_enforced`, or `disabled`          |
| `JWT_SECRET`             | generated in some single-instance flows | Signs authentication tokens; set a stable production value |
| `CSRF_SECRET`            | generated in some single-instance flows | Protects state-changing browser requests                   |
| `JWT_ACCESS_EXPIRES_IN`  | `15m`                                   | Access-token lifetime                                      |
| `JWT_REFRESH_EXPIRES_IN` | `7d`                                    | Refresh-token lifetime                                     |

## OpenID Connect

Set `OIDC_ISSUER_URL`, `OIDC_CLIENT_ID`, `OIDC_CLIENT_SECRET`, and `OIDC_REDIRECT_URI`. Set `AUTH_MODE` to `hybrid` or `oidc_enforced`.

The redirect URI must exactly match the value registered with the provider and must use HTTPS in production.

## Email and password reset

Set `ENABLE_PASSWORD_RESET=true`, select `MAIL_TRANSPORT`, and configure either SMTP or Resend credentials. `MAIL_FROM` controls the visible sender.

## Regenerate the backend example

When the typed registry changes:

```bash
npm --prefix backend run gen:env
```

Commit the updated `backend/.env.example` with the registry change.
