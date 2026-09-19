# First run

Local authentication is enabled by default.

## Choose an authentication mode

| Mode            | Best for                                        |
| --------------- | ----------------------------------------------- |
| `local`         | ExcaliDash accounts                             |
| `hybrid`        | Local accounts and OpenID Connect               |
| `oidc_enforced` | OpenID Connect only                             |
| `disabled`      | One shared identity; isolated environments only |

::: danger Do not expose disabled authentication publicly
`AUTH_MODE=disabled` gives every visitor the same identity and access.
:::

## Create the administrator

For the default `local` mode:

1. Open the frontend URL.
2. Create the administrator account.
3. Sign in with that account.
4. Add users in **Admin**.

For OIDC, configure the provider first. Set `OIDC_FIRST_USER_ADMIN=true` to make the first OIDC user an administrator.

## Your workspace

Create drawings and organize them into collections.

![Dark-mode drawing dashboard with collections](/images/workspace.png)

Select **Share** to grant access. Collaborators appear as avatars and named cursors.

![Four live sessions reviewing a deployment diagram](/images/collaboration.png)

[Sample drawing credits](/images/CREDITS.txt).

## Protect the instance

Before exposing ExcaliDash beyond a local machine:

- Terminate TLS at a trusted reverse proxy.
- Set stable `JWT_SECRET` and `CSRF_SECRET` values.
- Keep `TRUST_PROXY=false` unless requests always pass through a trusted proxy.
- Persist the database and test a restore procedure.
- Keep frontend and backend image tags aligned.

See [Configuration](/guide/configuration).
