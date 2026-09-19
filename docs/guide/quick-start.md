# Quick start

The fastest way to try ExcaliDash is with Docker Compose. The production Compose file runs the frontend and backend together and stores application data in a named volume.

## Prerequisites

- Docker Engine or Docker Desktop
- Docker Compose v2
- Port `6767` available on the host

## Start ExcaliDash

Clone the repository and start the published images:

```bash
git clone https://github.com/ZimengXiong/ExcaliDash.git
cd ExcaliDash
docker compose -f docker-compose.prod.yml up -d
```

Open `http://localhost:6767`. On a new local-auth installation, the first-run flow walks you through creating the initial administrator.

::: tip Data persists between restarts
SQLite data and generated secrets live in the `backend-data` Docker volume. Running `docker compose down` keeps that volume. Do not add `-v` unless you intend to delete the stored data.
:::

## Check the services

```bash
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f
```

Both services include health checks. The frontend listens on port `6767`; the backend stays inside the Compose network and is reached through the frontend proxy.

## Stop the stack

```bash
docker compose -f docker-compose.prod.yml down
```

Next, review [first-run choices](/guide/first-run) or prepare a more durable [Docker deployment](/deploy/docker).
