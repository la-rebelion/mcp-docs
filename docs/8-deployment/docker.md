---
sidebar_position: 2
sidebar_label: Docker
title: Docker deployment
description: Run OpenAPI APIs and HAPI Workflows as MCP servers with Docker.
keywords:
  - Docker
  - MCP
  - OpenAPI
  - Arazzo
  - HAPI Workflows
  - HAPI
dateModified: '2026-08-23'
---

# Docker deployment

Run HAPI MCP servers locally, in cloud environments, or in disconnected networks with the official Docker image.

## Choose an image tag

| Tag | Intended use |
| --- | --- |
| `latest` | Production-ready HAPI 0.x release line. |
| `workflows` | HAPI v1 beta with OpenAPI and HAPI Workflows (Arazzo). |
| `arazzo` | Alias for `workflows`. |
| `1.0.0-beta.0823` | A pinned HAPI v1 beta version. |

:::caution[HAPI v1 is a beta]
Use `workflows`, `arazzo`, or a pinned `1.0.0-beta.*` tag to evaluate HAPI Workflows. Keep using `latest` for production until HAPI v1 is stable.
:::

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- An OpenAPI or Arazzo document
- Network access from the container to the documented API backend, unless all required documents and APIs are available locally

The v1 image runs as a non-root user, uses `/var/lib/hapi` for persistent state, and writes operational logs to standard container output.

## Serve an OpenAPI document

Mount a document from the current directory and expose the MCP server on port 3000:

```sh
docker run --name hapi-openapi --rm -d \
  -p 3000:3000 \
  -v "$PWD:/specs:ro" \
  hapimcp/hapi-cli:workflows \
  serve --specs /specs/openapi.yaml \
  --url https://api.example.com \
  --headless \
  --host 0.0.0.0 \
  --public-host http://localhost:3000
```

The MCP endpoint is available at `http://localhost:3000/mcp`.

- `--specs` chooses the API document.
- `--url` overrides the OpenAPI document's server URL.
- `--headless` exposes MCP while API requests are sent to the external backend.
- `--host 0.0.0.0` makes the service reachable through Docker port publishing.
- `--public-host` is the public MCP URL advertised to OAuth clients.

## Serve HAPI Workflows (Arazzo)

HAPI Workflows expose supported Arazzo `workflowId` values as MCP tools.

First, validate the workflow:

```sh
docker run --rm \
  -v "$PWD:/specs:ro" \
  hapimcp/hapi-cli:workflows \
  workflows validate --specs /specs/workflow.yaml
```

Then serve it:

```sh
docker run --name hapi-workflows --rm -d \
  -p 3000:3000 \
  -v "$PWD:/specs:ro" \
  hapimcp/hapi-cli:workflows \
  workflows serve --specs /specs/workflow.yaml \
  --port 3000 \
  --host 0.0.0.0 \
  --public-host http://localhost:3000
```

`hapi arazzo serve` and `hapi workflows serve` are exact aliases. The general `hapi serve` command also detects Arazzo documents automatically.

### Backends in workflows

When no `--url` is supplied, HAPI sends each step to the server declared by the OpenAPI document referenced by that Arazzo `sourceDescription`. This preserves workflows that call multiple APIs.

Use `--url` only when you intentionally want all workflow steps to use one replacement backend, such as a staging environment:

```sh
docker run --rm \
  -v "$PWD:/specs:ro" \
  hapimcp/hapi-cli:workflows \
  workflows serve --specs /specs/workflow.yaml \
  --url https://staging.example.com
```

## Persist HAPI state

Mount a host directory at `/var/lib/hapi` to retain local specifications and configuration between runs:

```sh
docker run --rm \
  -v "$HOME/.hapi:/var/lib/hapi" \
  hapimcp/hapi-cli:workflows plugins list
```

You can place documents under `$HAPI_HOME/specs` and refer to them by filename:

```sh
docker run --rm \
  -v "$HOME/.hapi:/var/lib/hapi" \
  hapimcp/hapi-cli:workflows \
  serve --specs petstore.yaml
```

If a mounted directory is not writable by the container user, use a read-only mount for documents (`:ro`) or adjust the directory ownership before mounting it as HAPI home.

## View logs and health

```sh
docker logs -f hapi-workflows
curl http://localhost:3000/health
```

## Docker Compose

```yaml
services:
  hapi-workflows:
    image: hapimcp/hapi-cli:workflows
    ports:
      - "3000:3000"
    volumes:
      - ./specs:/specs:ro
      - hapi-home:/var/lib/hapi
    command:
      - workflows
      - serve
      - --specs
      - /specs/workflow.yaml
      - --host
      - 0.0.0.0
      - --public-host
      - http://localhost:3000
    restart: unless-stopped

volumes:
  hapi-home:
```

Start it with:

```sh
docker compose up -d
docker compose logs -f hapi-workflows
```

## Air-gapped deployments

Pull and save the image on a connected machine:

```sh
docker pull hapimcp/hapi-cli:1.0.0-beta.0823
docker save hapimcp/hapi-cli:1.0.0-beta.0823 -o hapi-cli-v1-beta.tar
```

Load it on the disconnected machine:

```sh
docker load -i hapi-cli-v1-beta.tar
```

Mount the Arazzo and OpenAPI documents that the workflow needs. In a fully offline environment, do not use remote `--specs` values or remote `sourceDescriptions`; use local, mounted documents instead.

## References

- [HAPI CLI](/components/hapi-server/hapi-cli)
- [HAPI Workflows](/components/hapi-server/hapi-workflows)
- [Docker documentation](https://docs.docker.com/)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Arazzo Specification](https://spec.openapis.org/arazzo/latest.html)
