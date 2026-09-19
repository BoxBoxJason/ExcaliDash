# Deploy with Docker Compose

`docker-compose.prod.yml` runs the frontend, backend, and a persistent SQLite volume.

## Select an image version

The `EXCALIDASH_TAG` value selects both images:

```bash
EXCALIDASH_TAG=latest docker compose -f docker-compose.prod.yml pull
EXCALIDASH_TAG=latest docker compose -f docker-compose.prod.yml up -d
```

Pin a release for repeatable deployments. Use the same version for both images.

## Configure HTTPS

Route HTTPS traffic to container port `8080` or host port `6767`. The frontend proxies API and real-time traffic to the backend.

Set `TRUST_PROXY` to the number of trusted proxy hops:

```yaml
environment:
  - TRUST_PROXY=1
  - FRONTEND_URL=https://draw.example.com
```

## Persist and back up data

Back up `backend-data` with writes paused. For scheduled backups, mount a separate volume:

```yaml
environment:
  - BACKUP_SCHEDULE=0 0 4 * * *
  - BACKUP_DIR=/app/backups
  - BACKUP_RETENTION_DAYS=14
volumes:
  - backend-data:/app/prisma
  - backup-data:/app/backups
```

Test restoring a backup.

## Upgrade

```bash
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

Compose replaces changed containers while retaining named volumes. Check the service health and logs after every upgrade.

## Operational checklist

- HTTPS is enforced at the edge.
- Secrets are stable, unique, and stored outside version control.
- Database and backup volumes are persistent.
- Authentication behavior has been tested in a private session.
- Upload-size limits match the reverse proxy limits.
- A rollback image tag and a tested restore path are available.
