# Local development

ExcaliDash has separate React/Vite and Node/Express applications. Run them in separate terminals so each process has clear logs and shutdown behavior.

## Requirements

- Node.js 20 or newer
- npm 10
- Git

## Install dependencies

From the repository root:

```bash
npm run install:all
```

This installs the backend, frontend, and browser-test workspaces. Root tooling is installed with `npm install` when needed.

## Configure the apps

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Review the files before adding local overrides. The default frontend uses `/api`, which Vite proxies to the local backend.

## Start the backend

```bash
cd backend
npm run dev
```

The backend prepares the local database before starting its watched process on port `8000`.

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

Use focused workspace commands while iterating:

```bash
npm --prefix frontend test
npm --prefix backend test
npm --prefix frontend run lint
```

## Work on these docs

```bash
npm run docs:dev
```

VitePress watches Markdown, configuration, and theme files and updates the browser immediately.
