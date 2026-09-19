# First run

ExcaliDash starts with local authentication by default. The initial setup flow creates the first administrator before the dashboard opens.

## Choose an authentication mode

| Mode            | Best for                                                            |
| --------------- | ------------------------------------------------------------------- |
| `local`         | A straightforward deployment with ExcaliDash-managed accounts       |
| `hybrid`        | Local accounts alongside an OpenID Connect provider                 |
| `oidc_enforced` | Organizations that require identity-provider sign-in                |
| `disabled`      | Isolated, trusted environments where every visitor is the same user |

::: danger Do not expose disabled authentication publicly
With `AUTH_MODE=disabled`, requests share a single local identity. Use it only behind a trusted boundary.
:::

## Create the administrator

For the default `local` mode:

1. Open the frontend URL.
2. Follow the setup prompt to create the first administrator.
3. Sign in with that account.
4. Create additional users from the administration area when needed.

For OIDC deployments, configure the provider before the first sign-in. `OIDC_FIRST_USER_ADMIN=true` grants administrator access to the first provisioned OIDC user.

## Protect the instance

Before exposing ExcaliDash beyond a local machine:

- Terminate TLS at a trusted reverse proxy.
- Set stable `JWT_SECRET` and `CSRF_SECRET` values.
- Keep `TRUST_PROXY=false` unless requests always pass through a trusted proxy.
- Persist the database and test a restore procedure.
- Keep frontend and backend image tags aligned.

Continue with [configuration](/guide/configuration) for the environment-file pattern.
