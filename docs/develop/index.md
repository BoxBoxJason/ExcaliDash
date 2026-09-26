# Local development

Run the backend and frontend in separate terminals.

## Requirements

- Node.js 20 or newer
- npm 10
- Git

## Install dependencies

From the repository root:

```bash
npm run install:all
```

This installs backend, frontend, and browser-test dependencies. Run `npm install` for root tooling.

## Configure the apps

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Vite proxies `/api` requests to the backend.

## Start the backend

```bash
cd backend
npm run dev
```

The backend initializes the database and listens on port `8000`.

## Start the frontend

In another terminal:

```bash
cd frontend
npm run dev
```

Open `http://localhost:6767`.

## Run checks

```bash
npm test
npm run check
```

`npm test` runs real database integration tests followed by anonymous and
authenticated Playwright journeys. Unit/component tests are intentionally not
part of this repository. The integration suite still uses Vitest; it is not a
second browser runner.

To run a smaller suite:

```bash
npm run test:integration
npm run test:e2e
npm run test:e2e:auth
npm --prefix e2e test -- tests/export-import.spec.ts
```

Install Chromium once with `cd e2e && npx playwright install chromium --with-deps`.
Playwright starts and stops isolated test servers on loopback ports `26767` and
`28000`. It uses `backend/prisma/e2e-test.db` or `agent-e2e.db`, never your normal
development database. Keep those ports free; existing servers are not reused by
default. Tests create and delete their own drawings and accounts.

CI runs both authentication modes. The authenticated suite covers browser login,
logout, private/view-only/revoked drawing access, conflicting saves and scoped
agent tokens. Anonymous journeys cover editing, collaboration, images, history,
imports, dashboard organization and preferences. No external AI calls are needed.

Use `npm --prefix e2e run report` (or `report:auth`) for the browser report.
Each mode keeps separate results so the second run does not overwrite the first.
Failures retain traces
and screenshots. Prefer observable UI/API state and polling assertions over
fixed sleeps; fail on rejected requests rather than silently returning. A test
passing against seeded API data is not a replacement for exercising its key user
action through the browser.

`NO_SERVER=true` targets explicitly supplied `BASE_URL`/`API_URL` instead. Use it
only for disposable test deployments, never a production instance. The anonymous
setup checks authentication is already disabled; it will not disable it for you.

## Work on these docs

```bash
npm run docs:dev
```

VitePress reloads the browser when files change.
