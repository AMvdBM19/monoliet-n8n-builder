# Monoliet n8n Builder

Fork of [czlonkowski/n8n-mcp](https://github.com/czlonkowski/n8n-mcp) configured for the Monoliet project.

## Purpose

Provides Claude Desktop with comprehensive tools to build, validate, and manage n8n workflows for the Monoliet infrastructure.

- **Build Workflows:** Create n8n workflows using natural language via Claude
- **Search Nodes:** Find nodes by functionality (1,084 nodes available)
- **Validate Configurations:** Ensure workflows are correctly configured
- **Manage Workflows:** Create/update/execute workflows on n8n.monoliet.cloud

## Architecture

```
Claude Desktop / Claude Code
        |
        | (MCP Protocol - stdio or HTTP)
        v
  monoliet-n8n-builder (this repo)
        |
        | (n8n REST API)
        v
  n8n.monoliet.cloud (existing n8n instance)
```

## Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Start in stdio mode (for Claude Desktop)
npm start

# Start in HTTP mode (for remote access)
npm run start:http
```

## VPS Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for full VPS deployment instructions.

```bash
# On VPS: /opt/docker/monoliet-n8n-builder
cp .env.monoliet.example .env
# Edit .env with your values
docker-compose -f docker-compose.monoliet.yml up -d
```

## Claude Desktop Integration

Add to `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "n8n-builder": {
      "command": "node",
      "args": ["C:/path/to/monoliet-n8n-builder/dist/mcp/index.js"],
      "env": {
        "MCP_MODE": "stdio",
        "LOG_LEVEL": "error",
        "DISABLE_CONSOLE_OUTPUT": "true",
        "NODE_DB_PATH": "C:/path/to/monoliet-n8n-builder/data/nodes.db"
      }
    }
  }
}
```

Or using npx (if published to npm):

```json
{
  "mcpServers": {
    "n8n-builder": {
      "command": "npx",
      "args": ["-y", "n8n-mcp"],
      "env": {
        "MCP_MODE": "stdio",
        "LOG_LEVEL": "error",
        "DISABLE_CONSOLE_OUTPUT": "true"
      }
    }
  }
}
```

## Key Files

| File | Purpose |
|------|---------|
| `docker-compose.monoliet.yml` | Monoliet VPS Docker Compose config |
| `.env.monoliet.example` | Monoliet-specific environment template |
| `docker-compose.yml` | Original upstream Docker Compose |
| `.env.example` | Original upstream environment template |
| `DEPLOYMENT.md` | VPS deployment guide |
| `README.md` | Original upstream documentation |

## Related Services

| Service | URL | Port |
|---------|-----|------|
| n8n | https://n8n.monoliet.cloud | 5678 |
| n8n-builder (this) | localhost:3000 | 3000 |

## License

MIT License - see [LICENSE](LICENSE) for details.

Original: Copyright (c) 2024 Romuald Czlonkowski
Monoliet Fork: Copyright (c) 2026 Monoliet
