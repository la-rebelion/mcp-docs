---
sidebar_position: 1.5
sidebar_label: "What's New in v1"
sidebar_class_name: green
title: "What's New in HAPI v1"
description: 'A guide to what changed in HAPI v1 — the monorepo split, the licensed OAuth broker, HAPI Workflows, and the new hapi serve --dry-run tooling — for anyone coming from the legacy v0.x line.'
keywords:
  - HAPI v1
  - migration
  - changelog
  - OAuth
  - Enterprise
  - HAPI Workflows
  - Arazzo
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2026-09-15'
---

# What's New in HAPI v1

HAPI v1 is a substantial rework of the CLI and server engine. If you set up
HAPI a while ago, or you're following an older tutorial or blog post, this
page walks through what changed and what you need to do about it. If you're
starting fresh, you can safely skip straight to [Getting Started](/getting-started) — everything there already reflects v1.

:::info Looking ahead: HAPI v1.2

[Jev, Capability Graph, and Capability Planning](/jev) are coming soon in HAPI
v1.2. The Private Beta is available by request at
[mcp.com.ai/request-demo](https://mcp.com.ai/request-demo).
:::

The short version: HAPI went from one flat package to a small family of
packages (a core engine, a CLI, and installable plugins), picked up a real
workflow orchestration feature (HAPI Workflows), and moved interactive OAuth
behind a paid Enterprise license — everything else (serving OpenAPI specs as
MCP tools, API-key/Basic/Bearer auth, Docker/Cloudflare/Fly.io deployment)
remains free and open source.

## The project is now a monorepo, not one flat package

Previously, `hapi` shipped as a single npm package containing the CLI, the
MCP/HTTP engine, OAuth handling, licensing, and telemetry all in one `src/`
tree. In v1, that's split into focused packages that install together:

- **`@mcp-com-ai/hapi`** — the CLI you actually run (`bunx hapi ...` /
  `bun add -g @mcp-com-ai/hapi`).
- **`@mcp-com-ai/core`** — the shared engine: OpenAPI parsing, MCP tool
  generation, the HTTP server.
- **First-party plugins**, installed alongside the CLI as needed:
  `@mcp-com-ai/plugin-openapi` (OpenAPI → MCP, the default), `@mcp-com-ai/plugin-arazzo`
  (HAPI Workflows, see below), `@mcp-com-ai/plugin-cloudflare` (`hapi deploy`
  to Cloudflare Workers), `@mcp-com-ai/plugin-otel` (OpenTelemetry).
- **Enterprise plugins** — licensed, closed-source, installed the same way
  as any other plugin once you have an entitlement. Today this is
  `@mcp-com-ai/enterprise-plugin-auth` (see below).

You don't need to think about this split day-to-day — `bun add -g
@mcp-com-ai/hapi` pulls in the OSS plugins you need — but it explains why
error messages, `hapi plugins list` output, and package names look different
from what older guides describe.

The project also lives at a new home: [github.com/mcp-com-ai/hapimcp](https://github.com/mcp-com-ai/hapimcp)
(previously `apicove-hapi`).

## OAuth is now a licensed Enterprise feature

This is the change most likely to affect an existing deployment, so read
this section even if you skim the rest of the page.

**What still works for free, no license needed:** static API-key, HTTP
Basic, and configured Bearer-token authentication, defined the same way as
before via OpenAPI security schemes (or `x-hapi.security`). If your backend
authenticates with a fixed API key or bearer token, nothing changes for you.

**What now requires a license:** interactive OAuth2 — an OpenAPI (or HAPI
Workflows/Arazzo) document whose security scheme is `type: oauth2`, where
HAPI acts as the OAuth broker between an MCP client and your upstream
authorization server. That capability now lives in a separate, licensed
plugin, `@mcp-com-ai/enterprise-plugin-auth`, and needs a `core.enterprise`
or `auth.oauth-broker` entitlement. Without it, `hapi serve`/`hapi deploy`
will refuse to start an OAuth2-protected document.

When it's licensed and installed, the broker itself is more capable than
before: it handles standard MCP OAuth discovery, dynamic client
registration, and PKCE with the connecting client, while keeping your
upstream OAuth exchange (authorization-code or client-credentials) entirely
inside your own deployment — an MCP client never sees your upstream
provider's tokens. Native (Bun/Docker) deployments keep broker state in
local encrypted storage; production Cloudflare Workers need a D1 database
(`--tokens-db` / `HAPI_TOKENS_DB`) and an `HAPI_OAUTH_BROKER_KEY`.

To get set up: reach out about an Enterprise entitlement, then install
`@mcp-com-ai/enterprise-plugin-auth` alongside your existing HAPI CLI
install — it registers itself automatically once licensed.

:::caution Legacy (v0.x) — removed, not just relicensed
Two things from the old OAuth handling are gone outright, with no
Enterprise equivalent, because they were never meant for production: the
`enableOpaqueOAuth` feature flag and its `POST /oauth2/opaque` endpoint (a
workaround letting a user hand a raw access token straight to the server),
and the `--relaxed-auth` / `HAPI_RELAXED_AUTH` dev bypass that disabled MCP
authorization checks. If an older guide mentions either of these, treat it
as v0.x-only — there's no direct replacement, because the licensed OAuth
broker's real discovery/DCR/PKCE flow replaces the need for both.
:::

## HAPI Workflows: multi-step orchestration over Arazzo

New in v1: HAPI can serve [Arazzo](https://www.openapis.org/arazzo) workflow
documents as MCP tools, not just single OpenAPI operations — useful when a
task genuinely needs several API calls chained together (look something up,
then act on the result) and you'd rather define that sequence once than
leave an agent to improvise it every time.

- `hapi arazzo serve` / `hapi workflows serve` (an alias) serves a workflow
  document the same way `hapi openapi serve` serves an OpenAPI one.
- Plain `hapi serve --specs <document>` auto-detects whether the document is
  OpenAPI or Arazzo and dispatches to the right engine — most of the time
  you don't need to pick a subcommand at all.
- `hapi arazzo validate` checks a workflow document offline before you
  serve it.

See the dedicated [HAPI Workflows guide](/components/hapi-server/hapi-workflows) for the full picture, including how workflows can
span multiple backend OpenAPI documents.

## `hapi serve --dry-run`: preview tools, generate submission and agent-prompt scaffolding

New in v1: `hapi serve --dry-run` computes the exact MCP tool list your
document would expose — without starting a server, binding a port, or
registering any routes. On its own, it's a fast way to sanity-check what
you're about to expose. Combined with `--output`, it also generates two
kinds of starting-point documents:

```bash
# Human-readable table (the default) — quick sanity check, with a rough
# token-count estimate so you can spot an oversized tool list before it ships
hapi serve --dry-run --specs ./openapi.yaml

# A ChatGPT App submission scaffold (openai.com's chatgpt-app-submission
# schema), with the parts HAPI can't know left as clearly marked placeholders
hapi serve --dry-run --output json --specs ./openapi.yaml

# An AI-agent system-prompt template — Role, Objective, Available Tools,
# Tool-Use Policy, Operational Process, Error Handling, Guardrails
hapi serve --dry-run --output markdown --specs ./openapi.yaml
```

Each of the last two comes with a companion skill your coding agent (Claude
Code, Codex CLI, GitHub Copilot CLI, or others that support custom
skills/prompts) can use to fill in the placeholders — `hapi-apps-dump` for
the submission file, `hapi-agent-prompt-generator` for the system prompt.
Both ship with the CLI and are referenced directly in `hapi serve --dry-run
--help`.

## Smaller changes worth knowing about

- **`--public-host` vs `--host`**: the bind address (`--host`, e.g.
  `0.0.0.0` in Docker) and the public URL advertised in OAuth/MCP resource
  metadata (`--public-host`) are now separate options. If your server sits
  behind a proxy or a Cloudflare Worker, set `--public-host` to the URL
  clients actually reach.
- **`--specs` replaces `--openapi` as the primary document selector.**
  `--openapi` still works as a backward-compatible alias for OpenAPI
  documents specifically; `--specs` is document-type-neutral and works for
  both OpenAPI and Arazzo/Workflows documents, so it's what new scripts
  should use.
- **Deployment**: `hapi deploy` (Cloudflare Workers) now ships separate
  public and licensed Worker bundles — a public OSS Worker never contains
  any OAuth broker code, even if you never intended to use OAuth. Portable
  binaries can install approved plugins (including Enterprise ones, once
  licensed) into a managed `$HAPI_HOME/plugins` store with `hapi plugins
  install`.
- **CLI typo protection**: a mistyped flag (e.g. `--pulic-host` instead of
  `--public-host`) now prints a warning naming the flag it couldn't match,
  instead of silently being ignored.

## If you're still running v0.x

The legacy single-package CLI (versions up to `0.8.7`, previously published
as `@la-rebelion/hapimcp`) is no longer where active development happens.
It doesn't have HAPI Workflows, the licensed OAuth broker, or `--dry-run`,
and its OAuth handling — including the now-removed `enableOpaqueOAuth`
workaround — was a built-in, unlicensed feature of the single package. If
you're still on that line and evaluating whether to move to v1:

- Static API-key/Basic/Bearer-protected APIs migrate with no licensing
  changes — just install the current CLI and plugins.
- OAuth-protected APIs need the Enterprise Auth plugin and a license going
  forward; budget for that conversation before you migrate an OAuth-secured
  deployment.
- Commands that used to be built-in top-level commands (`hapi login`,
  `hapi status`, `hapi license`) now come from the plugin(s) that own that
  functionality (Cloudflare deploy, licensing) rather than shipping in every
  install by default.

If something you relied on in v0.x doesn't have an obvious v1 equivalent
here, that's worth flagging — reach out to the team rather than assuming
it's gone for good.
