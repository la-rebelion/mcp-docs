---
sidebar_position: 2
title: HAPI CLI
description: Command-line tool for managing HAPI MCP projects
keywords:
  - HAPI CLI
  - command-line
  - API management
  - MCP
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

## Basic Usage

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

## Common Options

| Option            | Description                                                      | Default                |
|-------------------|------------------------------------------------------------------|------------------------|
| `-p, --port`      | Port to listen on                                                | `3000`                 |
| `-d, --debug`     | Enable debug mode                                                |                        |
| `-m, --mcp`       | Enable MCP mode (Greenfield)                                     | `false`                |
| `--headless`      | Run in headless mode (no REST API, only MCP - Brownfield)        | `false`                |
| `-u, --url`       | Base URL for backend API (used in headless mode) - default: Swagger's servers | `http://localhost:3000`|
| `--cert`          | Path to SSL certificate file (.pem) for HTTPS                    |                        |
| `--key`           | Path to SSL key file (.pem) for HTTPS                            |                        |
| `-c, --cors`      | Comma-separated list of allowed origins for CORS                 | `*` (all origins)      |

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

## Help

To see all available commands and options:

```bash
hapi --help
```

## Further Reading

- [HAPI Server Documentation](../hapi-server)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)

