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

To check one workspace:

```bash
npm --prefix frontend test
npm --prefix backend test
npm --prefix frontend run lint
```

## Work on these docs

```bash
npm run docs:dev
```

VitePress reloads the browser when files change.
