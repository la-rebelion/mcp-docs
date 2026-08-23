---
sidebar_position: 3
title: HAPI Workflows
description: Run Arazzo workflows as MCP tools with HAPI.
keywords:
  - HAPI Workflows
  - Arazzo
  - MCP
  - OpenAPI
dateModified: '2026-08-23'
---

# HAPI Workflows

HAPI Workflows lets you expose an [Arazzo](https://spec.openapis.org/arazzo/latest.html) document as MCP tools. A workflow can coordinate one or more documented OpenAPI operations, so an agent can use a meaningful outcome—such as scheduling an appointment—instead of manually orchestrating every API call.

:::caution[Beta release]
HAPI Workflows is available in the HAPI v1 beta. Use the Docker image tags `workflows`, `arazzo`, or a pinned `1.0.0-beta.*` version for evaluation. The `latest` tag remains the production-ready HAPI 0.x release line until HAPI v1 is stable.
:::

## What you need

- An Arazzo 1.1 document (`.yaml`, `.yml`, or `.json`).
- OpenAPI documents referenced by its `sourceDescriptions`.
- Network access from HAPI to the APIs described by those OpenAPI documents.

Each supported `workflowId` becomes one MCP tool. HAPI validates the document before it starts serving, so invalid source references or operation references are reported before clients can call a tool.

## Validate a workflow document

Validate before serving it:

```bash
hapi arazzo validate ./workflow.yaml
```

`workflows` is an exact alias for `arazzo`:

```bash
hapi workflows validate ./workflow.yaml
```

Use `--specs` when the document is remote, stored outside the current directory, or named from your HAPI home:

```bash
hapi workflows validate --specs https://example.com/workflow.yaml
hapi workflows validate --specs "$HAPI_HOME/specs/workflow.yaml"
```

`--specs` accepts local paths, `file:` and `path:` URLs, HTTP(S) URLs, and a filename under `$HAPI_HOME/specs`.

## Serve workflows as MCP tools

Start an MCP server from an Arazzo document:

```bash
hapi workflows serve --specs ./workflow.yaml \
  --port 3000 \
  --host 0.0.0.0 \
  --public-host http://localhost:3000
```

The MCP endpoint is then available at `http://localhost:3000/mcp`.

These commands do the same thing:

```bash
hapi arazzo serve ./workflow.yaml
hapi workflows serve ./workflow.yaml
hapi serve ./workflow.yaml
```

The top-level `hapi serve` command detects whether the input is an OpenAPI or Arazzo document and chooses the appropriate behavior.

## Backends and multiple APIs

By default, HAPI uses each OpenAPI server URL declared by the Arazzo document's `sourceDescriptions`. This is important for workflows that use more than one API: each step is sent to the API it references.

Use `--url` only when all workflow steps should use one replacement base URL, for example when testing against a staging environment:

```bash
hapi workflows serve ./workflow.yaml --url https://staging.example.com
```

For workflows that call multiple backends, omit `--url` and set the correct server URL in each referenced OpenAPI document.

## Run with Docker

The HAPI v1 beta image includes OpenAPI and HAPI Workflows support:

```bash
docker run --name hapi-workflows --rm -d \
  -p 3000:3000 \
  -v "$PWD:/specs:ro" \
  hapimcp/hapi-cli:workflows \
  workflows serve --specs /specs/workflow.yaml \
  --port 3000 \
  --host 0.0.0.0 \
  --public-host http://localhost:3000
```

See the [Docker deployment guide](/deployment/docker) for persistence, logs, Compose, and offline deployment guidance.

## Troubleshooting

- Run `hapi workflows validate` first when a server does not start.
- Ensure every `sourceDescription` can be reached from the machine or container running HAPI.
- Use the `workflowId` shown by your MCP client as the tool name.
- Check the MCP tool result for the failing step and correlation ID when a workflow call fails.

## Further reading

- [HAPI CLI](/components/hapi-server/hapi-cli)
- [Docker deployment](/deployment/docker)
- [Arazzo Specification](https://spec.openapis.org/arazzo/latest.html)
