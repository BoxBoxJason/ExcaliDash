# Quick start

Run ExcaliDash with Docker Compose.

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

Open `http://localhost:6767` and create the administrator account.

::: tip Data persists between restarts
SQLite data and generated secrets are stored in `backend-data`. The `down` command preserves this volume; adding `-v` deletes it.
:::

## Check the services

```bash
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f
```

Both services have health checks. Port `6767` serves the frontend and proxies backend requests.

## Stop the stack

```bash
docker compose -f docker-compose.prod.yml down
```

Next: [First run](/guide/first-run) or [Docker deployment](/deploy/docker).
