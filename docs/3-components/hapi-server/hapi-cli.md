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

The HAPI CLI is a command-line tool for managing and serving API projects using the HAPI server. It enables you to bootstrap, configure, and run API-first services with ease.

## Installation

You can install the HAPI CLI globally using Bun or npm:

```bash
bun install -g hapi
# or
npm install -g hapi
```

## Basic Usage

To start a HAPI server for your API project, use the `serve` command:

```bash
hapi serve <projectname> [options]
```

### Example

```bash
hapi serve petstore --port 3000
```

This will start the HAPI server for the "petstore" project on port 3000.

## Common Options

| Option            | Description                                                      | Default                |
|-------------------|------------------------------------------------------------------|------------------------|
| `-p, --port`      | Port to listen on                                                | `3000`                 |
| `-d, --debug`     | Enable debug mode                                                |                        |
| `-m, --mcp`       | Enable MCP mode                                                  | `false`                |
| `--headless`      | Run in headless mode (no REST API, only MCP)                     | `false`                |
| `-u, --url`       | Base URL for backend API (used in headless mode)                 | `http://localhost:3000`|
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
hapi serve myproject --debug
```

## Help

To see all available commands and options:

```bash
hapi --help
```

## Further Reading

- [HAPI Server Documentation](./hapi-server.md)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)

