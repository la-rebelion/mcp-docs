---
sidebar_position: 2
sidebar_label: Docker
title: 'Docker: Deploying HAPI MCP Servers'
description: 'How to deploy and run HAPI MCP servers using Docker for local development, cloud deployment, and air-gapped environments.'
keywords:
  - Docker
  - MCP
  - OpenAPI
  - API-first
  - Model Context Protocol
  - Container
  - HAPI
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2025-01-05'
---

# Docker: Deploying HAPI MCP Servers

This guide covers how to deploy and run HAPI MCP servers using Docker for local development, cloud deployments, and air-gapped environments.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine
- Access to the HAPI MCP CLI image (`hapimcp/hapi-cli`)
- An OpenAPI specification for your API

## Quick Start: Run Locally

The fastest way to start an HAPI MCP server locally is using `docker run` with volume mounts for configuration and specs.

### Basic Example

```sh
docker run --name hapi-petstore -d --rm \
  -p 3030:3030 \
  -v ~/.hapi:/app/.hapi \
  hapimcp/hapi-cli:latest serve petstore \
  --port 3030 \
  --headless
```

**What this does:**
- `--name hapi-petstore`: Names the container for easy reference.
- `-d`: Runs the container in detached mode (background).
- `--rm`: Automatically removes the container when it stops.
- `-p 3030:3030`: Exposes port 3030 from the container to your host.
- `-v ~/.hapi:/app/.hapi`: Mounts your local HAPI home directory for persistence.
- `serve petstore`: Runs the petstore example (built-in demo).
- `--port 3030`: Sets the server port inside the container.
- `--headless`: Act as a **headless-API (HAPI) server**, the business logic runs in the server defined by the OpenAPI spec.

### With Environment Variables

For more control, pass environment variables:

```sh
docker run --name hapi-petstore -d --rm \
  -p 3030:3030 \
  -v ~/.hapi:/app/.hapi \
  -e HAPI_HOME=/app/.hapi \
  hapimcp/hapi-cli:0.6.0 serve petstore \
  --port 3030 \
  --headless \
  --dev \
  --url "https://petstore3.swagger.io/api/v3"
```

**Key environment variables:**
- `HAPI_HOME`: Path to HAPI configuration directory inside the container.
- `url`: Backend API URL for headless mode. Overrides the default in the OpenAPI spec.
- `dev`: Enables development mode with verbose logging.

## Advanced Usage: Custom OpenAPI Specs

If you have multiple OpenAPI specs in a local directory, mount them into the container:

```sh
docker run --name hapi-custom -d --rm \
  -p 3030:3030 \
  -v ~/.hapi:/app/.hapi \
  -v ~/my-specs:/app/.hapi/specs \
  hapimcp/hapi-cli:latest serve my-api-openapi \
  --port 3030 \
  --headless
```

The parameter `my-api-openapi` corresponds to the filename (without extension) of your OpenAPI spec located in `~/my-specs`.

### List Available Specs

View all mounted specs without starting a server:

```sh
docker run --rm \
  -v ~/.hapi:/app/.hapi \
  hapimcp/hapi-cli:latest list
```

This outputs all available OpenAPI specs and configurations.

### Help Command

Get help on commands and options:

```sh
docker run --rm hapimcp/hapi-cli:latest help
```

## Container Management

### View Logs

```sh
docker logs hapi-petstore
```

For real-time logs:

```sh
docker logs -f hapi-petstore
```

### Stop a Container

```sh
docker stop hapi-petstore
```

### Remove a Container Manually

```sh
docker rm hapi-petstore
```

## Air-Gapped / Offline Deployments

For environments without internet access, pre-pull the image and load it:

### Save Image Locally

```sh
docker pull hapimcp/hapi-cli:latest
docker save hapimcp/hapi-cli:latest -o hapi-cli-latest.tar
```

### Load on Air-Gapped Machine

```sh
docker load -i hapi-cli-latest.tar
```

### Run in Air-Gapped Environment

```sh
docker run --name hapi-offline -d --rm \
  -p 3030:3030 \
  -v ~/.hapi:/app/.hapi \
  hapimcp/hapi-cli:latest serve petstore \
  --port 3030 \
  --headless \
  --url "https://petstore3.air-gapped.local/api/v3"
```

:::note
To access external APIs, ensure your air-gapped environment has the necessary network configurations.
:::

## Docker Compose Example

For more complex setups, use Docker Compose:

```yaml
version: '3.8'

services:
  hapi-mcp:
    image: hapimcp/hapi-cli:latest
    container_name: hapi-mcp-server
    ports:
      - "3030:3030"
    environment:
      - NODE_ENV=development
      - HAPI_HOME=/app/.hapi
    volumes:
      - ~/.hapi:/app/.hapi
      - ./more-specs:/app/.hapi/specs
    command: serve petstore --port 3030 --headless --dev
    restart: unless-stopped
  # Add more services as needed, i.e., a CRM, database, etc.
  my-crm-mcp:
    image: hapimcp/hapi-cli:latest
    container_name: my-crm-mcp-server
    ports:
      - "4040:3030"
    environment:
      - NODE_ENV=production
      - HAPI_HOME=/app/.hapi
    volumes:
      - ~/.hapi:/app/.hapi
      - ./crm-specs:/app/.hapi/specs
    command: serve crm-api --port 3030 --headless
    restart: unless-stopped
```

### Run with Compose

```sh
docker-compose up -d
```

### View Logs

```sh
docker-compose logs -f hapi-mcp
```

### Stop

```sh
docker-compose down
```

## Cloud Deployment with Docker

### Build and Push to Docker Registry

If you customize the HAPI MCP CLI container instance, save and push it to your Docker registry:

```sh
docker save hapimcp/hapi-cli:latest -o hapi-cli-1.0.0.tar
# in your air-gapped or cloud environment
docker load -i hapi-cli-1.0.0.tar
docker push your-registry/hapi-cli:1.0.0
```

### Deploy to Cloudflare Workers with Docker

For serverless deployment, use the Docker image with Cloudflare Workers:

1. **Ensure the image is accessible** from your build environment.
2. **Use the `hapi deploy` command** (which internally uses Wrangler) to deploy:

```sh
hapi deploy --openapi https://my-api.example.com/openapi.json \
  --url https://my-api.example.com \
  --name my-hapi-worker
```

For more details, see the Cloudflare Workers Deployment guide and the HAPI MCP CLI documentation for [Cloudflare deployment](./cloud/cloudflare) options.

## Best Practices

- **Use explicit version tags:** Always specify a version (e.g., `0.6.0`) instead of latest **for production**.
- **Mount HAPI home:** Keep configuration persistent with `-v ~/.hapi:/app/.hapi`.
- **Resource limits:** Use `--memory` and `--cpus` to limit container resources.
- **Health checks:** Add health checks for production deployments. The MCP server exposes a `/health` endpoint, also, you can use the [`ping` MCP utility](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/ping).
- **Logging:** Monitor logs regularly and use log aggregation tools for large deployments.
- **Security:** Run as non-root, use read-only mounts where possible, and scan images for vulnerabilities.

## Troubleshooting

### Container Exits Immediately

Check logs:

```sh
docker logs hapi-petstore
```

### Port Already in Use

Change the host port:

```sh
docker run -p 3031:3030 ... # Maps host 3031 to container 3030
```

### Permission Denied on Volume Mount

Ensure the mounted directory has correct permissions:

```sh
chmod 755 ~/.hapi
```

## References

- [Docker Documentation](https://docs.docker.com/)
- [HAPI MCP CLI Documentation](https://docs.mcp.com.ai)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)

