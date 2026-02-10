# VPS Deployment Guide

## Prerequisites

- Ubuntu VPS with Docker and Docker Compose installed
- Docker network "web" exists (shared with nginx-proxy-manager)
- Target directory: `/opt/docker/monoliet-n8n-builder`
- n8n running at https://n8n.monoliet.cloud

## Step 1: Clone Repository

```bash
cd /opt/docker
git clone https://github.com/AMvdBM19/monoliet-n8n-builder.git
cd monoliet-n8n-builder
```

## Step 2: Configure Environment

```bash
cp .env.monoliet.example .env
```

Generate an authentication token and edit `.env`:

```bash
# Generate token
openssl rand -base64 32

# Edit configuration
nano .env
```

Required settings in `.env`:
- `AUTH_TOKEN` - paste the generated token
- `N8N_API_KEY` - get from n8n Settings > API > Create API Key

## Step 3: Create Docker Network (if needed)

```bash
# Check if "web" network exists
docker network ls | grep web

# Create if it doesn't exist
docker network create web
```

## Step 4: Build and Start

```bash
docker-compose -f docker-compose.monoliet.yml up -d --build
```

## Step 5: Verify

```bash
# Check container status
docker-compose -f docker-compose.monoliet.yml ps

# Check logs
docker-compose -f docker-compose.monoliet.yml logs -f n8n-builder

# Test health endpoint
curl http://localhost:3000/health
```

## Maintenance

### View Logs
```bash
docker-compose -f docker-compose.monoliet.yml logs -f n8n-builder
docker-compose -f docker-compose.monoliet.yml logs --tail=100 n8n-builder
```

### Update
```bash
cd /opt/docker/monoliet-n8n-builder
git pull origin main
docker-compose -f docker-compose.monoliet.yml up -d --build
```

### Restart
```bash
docker-compose -f docker-compose.monoliet.yml restart n8n-builder
```

### Stop
```bash
docker-compose -f docker-compose.monoliet.yml down
```

### Rebuild from Scratch
```bash
docker-compose -f docker-compose.monoliet.yml down
docker-compose -f docker-compose.monoliet.yml build --no-cache
docker-compose -f docker-compose.monoliet.yml up -d
```

### Backup Database
```bash
cp data/nodes.db data/nodes.db.backup-$(date +%Y%m%d)
```

## Troubleshooting

### Container won't start
```bash
# Verify .env exists and AUTH_TOKEN is set
cat .env | grep AUTH_TOKEN

# Check Docker network
docker network ls | grep web

# View startup logs
docker-compose -f docker-compose.monoliet.yml logs n8n-builder
```

### Health check failing
```bash
# Check if port 3000 is accessible
curl -v http://localhost:3000/health

# Enter container for debugging
docker-compose -f docker-compose.monoliet.yml exec n8n-builder sh
```

### n8n API connection issues
```bash
# Test n8n API connectivity from container
docker-compose -f docker-compose.monoliet.yml exec n8n-builder \
  curl -H "X-N8N-API-KEY: $N8N_API_KEY" https://n8n.monoliet.cloud/api/v1/workflows
```

## Integration with Existing Services

All services on the VPS share the Docker "web" network:

| Service | Container | Port |
|---------|-----------|------|
| n8n | n8n | 5678 |
| n8n-builder | monoliet-n8n-builder | 3000 |
| nginx-proxy-manager | nginx-proxy-manager | 80, 443 |
