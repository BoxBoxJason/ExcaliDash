# Deploy with Docker Compose

The supplied production Compose file uses published frontend and backend images and a persistent SQLite volume. It is a strong starting point for a single-host deployment.

## Pin an image channel

The `EXCALIDASH_TAG` value selects both images:

```bash
EXCALIDASH_TAG=latest docker compose -f docker-compose.prod.yml pull
EXCALIDASH_TAG=latest docker compose -f docker-compose.prod.yml up -d
```

Pin a numbered release when you need repeatable rollouts. Never run frontend and backend images from different versions.

## Put a proxy in front

Route one HTTPS origin to the frontend container on port `8080` inside its network, or to host port `6767` with the supplied mapping. The frontend proxy forwards API and realtime traffic to the backend.

When enabling proxy trust, set it to the known hop count rather than accepting arbitrary forwarding headers:

```yaml
environment:
  - TRUST_PROXY=1
  - FRONTEND_URL=https://draw.example.com
```

## Persist and back up data

The default SQLite database lives in the `backend-data` volume. Back up that volume while writes are quiesced, or enable the built-in scheduled backup settings and mount a separate backup volume.

```yaml
environment:
  - BACKUP_SCHEDULE=0 0 4 * * *
  - BACKUP_DIR=/app/backups
  - BACKUP_RETENTION_DAYS=14
volumes:
  - backend-data:/app/prisma
  - backup-data:/app/backups
```

Test restoration before relying on a backup process.

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
