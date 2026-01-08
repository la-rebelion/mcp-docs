---
sidebar_position: 2
title: HAPI CLI
description: Command-line tool for managing HAPI MCP projects
keywords:
  - HAPI CLI
  - command-line
  - API management
  - MCP
  - Cloudflare Workers
  - Fly.io
  - Docker
dateModified: '2026-01-06'
---

# HAPI CLI

The HAPI CLI is a command-line tool for managing and serving API projects using the HAPI server for Model Context Protocol (MCP). It enables you to bootstrap, configure, and run API-first services with ease.

## Installation

To install HAPI CLI, you can download the latest release from the [HAPI GitHub repository](https://github.com/la-rebelion/hapi-cli/releases).

Another option is to use the `install` script accessible via curl:

**Linux users**

```bash
curl -fsSL https://get.mcp.com.ai/hapi.sh | bash
```

**Windows users**

```shell
irm https://get.mcp.com.ai/hapi.ps1 | iex
```

Or **download the binary directly** from the [releases page](https://github.com/la-rebelion/hapimcp/releases/)

Other installation methods, including Docker, [Fly.io](https://fly.io/dashboard), and [Cloudflare](https://dash.cloudflare.com) Workers, can be found in the [HAPI Server Deployment](/deployment).

## Commands Overview

- `serve`: Start a HAPI MCP server from a local project name or a remote OpenAPI URL.
- `list`: Show available specs discovered under `~/.hapi/specs` (or your configured `HAPI_HOME`).
- `deploy`: Publish a HAPI MCP server to Cloudflare Workers (uses Wrangler under the hood).
- `login`: Authenticate the CLI for deploy targets.
- `--help`: Display the full command and flag reference.

## Basic Usage (serve)

To start a HAPI server for your API project, use the `serve` command:

```bash
# local file
hapi serve <projectname> [options]
# remote URL
hapi serve https://petstore3.swagger.io/api/v3/openapi.json [options]
```

### Example

```bash
hapi serve petstore --headless
```

This will start the Headless API (HAPI) MCP server for the "petstore" project on port 3000 (default).

## Common Options (serve)

| Option            | Description                                                      | Default                |
|-------------------|------------------------------------------------------------------|------------------------|
| `-p, --port`      | Port to listen on                                                | `3000`                 |
| `--dev`           | Enable developer/debug mode                                      |                        |
| `-m, --mcp`       | Enable MCP mode (Greenfield)                                     | `false`                |
| `--headless`      | Run in headless mode (no REST API, only MCP - Brownfield)        | `false`                |
| `-u, --url`       | Base URL for backend API (used in headless mode) - default: Swagger's servers | `http://localhost:3000`|
| `--cert`          | Path to SSL certificate file (.pem) for HTTPS                    |                        |
| `--key`           | Path to SSL key file (.pem) for HTTPS                            |                        |
| `-c, --cors`      | Comma-separated list of allowed origins for CORS                 | `*` (all origins)      |
<!-- | `--log-level`     | Override log level (e.g., `info`, `debug`, `warn`, `error`)      | environment default    | -->

### Environment variables

| Variable                | Purpose                                                          |
|-------------------------|------------------------------------------------------------------|
| `HAPI_HOME`             | Directory for specs, configs, and logs (matches `--home`).       |
| `HAPI_OPENAPI`          | Override the OpenAPI source URL/path when using deploy flows.    |
| `HAPI_URL`              | Backend base URL for headless mode.                              |
| `HAPI_LOG_LEVEL_DEV`    | Log level when `NODE_ENV=development`.                           |
| `HAPI_LOG_LEVEL_PROD`   | Log level when `NODE_ENV=production`.                            |
| `HAPI_DISABLE_FILE_LOGS`| Set to `true` to disable file logging.                           |

> Tip: Flags take precedence over environment variables when both are provided.

## Running with TLS (HTTPS)

To enable HTTPS, provide both a certificate and key file:

```bash
hapi serve linkedin --port 443 --cert ./certs/cert.pem --key ./certs/key.pem
```

> **Tip:** You can generate a self-signed certificate for development using OpenSSL:
> ```bash
> openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365 -subj "/CN=localhost"
> ```

## Headless Mode

Headless mode disables the REST API and only enables MCP server functionality:

```bash
hapi serve myproject --headless
```

## CORS Configuration

Allow specific origins for CORS:

```bash
hapi serve myproject --cors "https://example.com,https://another.com"
```

## Debugging

Enable debug mode to see detailed logs and registered routes:

```bash
hapi serve myproject --dev
```

## Listing available specs

List all OpenAPI specs discovered in your HAPI home:

```bash
hapi list
```

## Deploying to Cloudflare Workers

Use `hapi deploy` to publish a worker (Wrangler required):

```bash
hapi deploy --openapi https://petstore3.swagger.io/api/v3/openapi.json \
  --url https://petstore3.swagger.io/api/v3 \
  --name petstore-hapi
```

Notable flags:

- `--openapi <url>`: (required) OpenAPI spec URL or file.
- `--url <url>`: Backend base URL for headless mode.
- `--name <name>`: Worker name (RFC 1123 compliant). Autogenerated if omitted.
- `--project <project>`: Optional project grouping name.
- `--var KEY=VALUE`: Repeatable extra vars passed to the worker.
- `--dry-run`: Show what would be deployed without executing.
- `--keep-config`: Keep generated temporary config files for inspection.

## Using Docker

You can run the CLI inside a container for local or air-gapped environments:

```bash
docker run --name hapi-petstore -d --rm \
  -p 3030:3030 \
  -v ~/.hapi:/app/.hapi \
  hapimcp/hapi-cli:latest serve petstore --port 3030 --headless
```

For more deployment patterns (Fly.io, Cloudflare, air-gapped), see the Docker deployment guide in the deployment section.

## Help

To see all available commands and options:

```bash
hapi --help
```

## Further Reading

- [HAPI Server Documentation](../hapi-server)
- HAPI MCP Server [Deployment Guide](/deployment)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)

