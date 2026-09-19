# Architecture

ExcaliDash is split into a browser application and an API service. Production deployments place both behind one frontend origin.

## Request path

```text
Browser
  └─ Frontend (React + Vite build, served by nginx)
       ├─ Static application assets
       └─ /api and realtime traffic
            └─ Backend (Express + Socket.IO)
                 ├─ Prisma database
                 └─ Drawing file storage
```

Keeping one browser origin makes cookies and CSRF protection predictable and avoids unnecessary CORS configuration.

## Frontend

The frontend owns dashboard and editor interaction. It embeds Excalidraw, loads drawing metadata through the API, and uses Socket.IO for live collaboration.

## Backend

The backend owns authentication, authorization, drawing persistence, sharing, history, imports and exports, files, and realtime coordination. Environment parsing is centralized under `backend/src/config/`.

## Storage

Prisma provides database access. SQLite is the default single-host choice; PostgreSQL is available for deployments that need an external database. Drawing files may be stored locally or in configured object storage.

## Deployment boundary

The production frontend image includes the reverse-proxy configuration that connects browser traffic to the backend service. Both images must come from the same ExcaliDash version.
