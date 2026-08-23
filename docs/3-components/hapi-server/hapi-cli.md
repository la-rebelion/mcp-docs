---
sidebar_position: 2
title: HAPI CLI
description: Serve OpenAPI APIs and Arazzo workflows as MCP servers with the HAPI CLI.
keywords:
  - HAPI CLI
  - OpenAPI
  - Arazzo
  - HAPI Workflows
  - MCP
dateModified: '2026-08-23'
---

# HAPI CLI

The HAPI CLI turns documented APIs and workflows into MCP servers. Use it with an OpenAPI document to expose API operations as tools, or with an Arazzo document to expose higher-level HAPI Workflows.

## HAPI v1 beta

HAPI Workflows is part of the upcoming HAPI v1 release. Docker users can try it with:

```bash
docker pull hapimcp/hapi-cli:workflows
```

`hapimcp/hapi-cli:workflows` and `hapimcp/hapi-cli:arazzo` point to the same v1 beta image. Pin a `1.0.0-beta.*` version when repeatability matters.

:::note
The `latest` Docker tag remains the production-ready HAPI 0.x line until HAPI v1 is stable.
:::

## Commands

| Command | Use it to |
| --- | --- |
| `hapi serve` | Serve an OpenAPI or Arazzo document; HAPI detects the document type. |
| `hapi openapi serve` | Explicitly serve an OpenAPI document as MCP tools. |
| `hapi arazzo serve` | Explicitly serve an Arazzo document as HAPI Workflow MCP tools. |
| `hapi workflows serve` | Alias for `hapi arazzo serve`. |
| `hapi arazzo validate` | Validate an Arazzo document before serving it. |
| `hapi plugins list` | Show installed or bundled capabilities. |
| `hapi doctor` | Check the local HAPI environment. |

Run `hapi help` or append `--help` to any command for its complete option list.

## Choose a document

Use `--specs` for both OpenAPI and Arazzo documents:

```bash
# Local document
hapi serve --specs ./openapi.yaml

# HTTP(S) document
hapi serve --specs https://example.com/openapi.json

# Document stored under $HAPI_HOME/specs
hapi serve --specs petstore.yaml
```

Local paths, `file:` URLs, and `path:` URLs are read from the filesystem. HTTP(S) URLs are fetched remotely. The legacy `--openapi` option remains available for OpenAPI only; use `--specs` in new scripts.

## Serve an OpenAPI API

```bash
hapi openapi serve --specs ./openapi.yaml \
  --url https://api.example.com \
  --headless \
  --port 3000
```

`--url` selects the API backend that HAPI calls. Without it, HAPI uses the server URL in the OpenAPI document.

## Serve HAPI Workflows

```bash
hapi workflows validate --specs ./workflow.yaml

hapi workflows serve --specs ./workflow.yaml \
  --port 3000 \
  --host 0.0.0.0 \
  --public-host http://localhost:3000
```

Every supported Arazzo `workflowId` becomes an MCP tool. HAPI uses the server URL for each referenced `sourceDescription`; this lets a workflow call multiple APIs. See [HAPI Workflows](./hapi-workflows) for details.

## Common serve options

| Option | Description |
| --- | --- |
| `--specs <source>` | Local path, file/path URL, HTTP(S) URL, or a document in `$HAPI_HOME/specs`. |
| `--url <url>` | Override the backend URL. For multi-API workflows, omit it to use each source's declared server. |
| `--port <port>` | Port for the HAPI MCP server. Default: `3000`. |
| `--host <address>` | Address to bind. Use `0.0.0.0` in containers. |
| `--public-host <url>` | Public MCP URL advertised for OAuth and resource metadata. |
| `--headless` | OpenAPI mode: expose MCP while the API backend remains external. |
| `--dev` | Enable development diagnostics. |
| `--cors <origins>` | Comma-separated allowed browser origins. |

## Docker

The v1 beta image uses `/var/lib/hapi` as its HAPI home and writes logs to container output:

```bash
docker run --rm \
  -v "$HOME/.hapi:/var/lib/hapi" \
  hapimcp/hapi-cli:workflows plugins list
```

See [Docker deployment](/deployment/docker) for complete OpenAPI and HAPI Workflow examples.

## Further reading

- [HAPI Workflows](./hapi-workflows)
- [Docker deployment](/deployment/docker)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Arazzo Specification](https://spec.openapis.org/arazzo/latest.html)
