---
sidebar_position: 1
sidebar_label: VS Code (OrcA)
title: 'VS Code extension: OpenAPI and Arazzo to MCP server with OrcA'
description: 'Install OrcA for VS Code and turn OpenAPI (Swagger) and Arazzo contracts into MCP servers: dry-run MCP tools, run locally with HAPI, deploy, and add servers to VS Code.'
keywords:
  - VS Code extension
  - OrcA
  - OpenAPI to MCP
  - Swagger to MCP
  - Arazzo
  - MCP server
  - hapi serve
  - mcp.json
  - GitHub Copilot MCP
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2026-09-27'
---

# VS Code extension: OrcA

The **OrcA** extension brings the HAPI MCP Stack into VS Code. You open an OpenAPI or Arazzo contract, see the MCP tools it produces, run it as a local MCP server, and connect it to your AI assistant, without leaving the editor.

:::info What is OrcA?
This page is the practical guide. For what OrcA is, why it exists and where it fits in the stack, see **[OrcA component](../../3-components/orca/index.md)** and **[How OrcA works](../../3-components/orca/how-it-works.md)**.
:::

## Why use the extension?

- **No context switching.** The contract, its MCP tools, the running server and your AI assistant are all in one window.
- **See before you ship.** Dry Run shows the exact tool list an agent will get.
- **Safe local runs.** OrcA picks a free port, tracks the server, and tells you when it stops.
- **One click to your assistant.** **Add to VS Code** registers the server in `.vscode/mcp.json` for Copilot, Claude and other MCP clients.

## Install

1. In VS Code, open **Extensions** and search for **OrcA**. You can also install from the [Marketplace](https://marketplace.visualstudio.com/items?itemName=la-rebelion-labs.orca-mcp) or run:
   ```bash
   code --install-extension la-rebelion-labs.orca-mcp
   ```
2. Requirements:
   - VS Code **1.138** or newer (Windows, macOS, Linux, WSL, SSH, Dev Containers).
   - The **HAPI CLI v1** for Run and Dry Run. If it is missing, OrcA offers to install it (**OrcA: Install HAPI CLI**). To install it yourself:
     ```bash
     # Linux, macOS, WSL
     curl -fsSL https://get.mcp.com.ai/hapi.sh | bash -s -- --version v1
     ```
     ```powershell
     # Windows (PowerShell)
     $s = irm https://get.mcp.com.ai/hapi.ps1; & ([scriptblock]::Create($s)) --version v1
     ```
3. Open the **OrcA** icon in the activity bar. New to OrcA? Run **OrcA: Open Guide** for an animated tour, or open *Help → Welcome → Get started with OrcA*.

## Quickstart: OpenAPI to MCP in 60 seconds

1. Open an OpenAPI 3.x file, or create one with **OrcA: New Contract… → OpenAPI**.
2. Click **Dry Run** (beaker icon) in the editor title bar and choose **Table** to see the MCP tools.
3. Click **Run with HAPI** (play icon). The server appears in **MCP Servers** and turns *running* when it is ready, for example at `http://localhost:3000/mcp`.
4. Accept **Add to VS Code** (or right-click the server → **Add to VS Code MCP Servers**). Your AI assistant can now call the API's tools.

## The OrcA sidebar

| View | What you do there |
| --- | --- |
| **Contracts** | Find OpenAPI and Arazzo files (Workspace and HAPI Home). Use **New Contract…** and **Validate All Arazzo** |
| **Outline** | Navigate the active contract. Arazzo: add or remove sources, workflows, steps |
| **MCP Servers** | Deploy, start, stop, restart, view logs, open in browser, add to VS Code, delete |
| **HAPI Home** | Browse `~/.hapi` (specs, config, plugins, logs, certs); run the specs stored there |
| **MCP Servers › Connect** | Browse a connected server's tools, resources and prompts; set request headers |
| **OrcA** (Secondary Sidebar) | **Chat** with your connected servers, and **Activity** (server events and failed calls) |
| **OrcA Traffic** (bottom Panel) | Every MCP message and LLM round as a graph; diff, replay, Copy as cURL, save sessions |

The status bar shows your HAPI session and mode, for example `HAPI: anonymous · local`.

## How-tos

### Generate an AI-agent system prompt from an API
Run **Dry Run → Markdown**. The template already lists every tool. Complete the role and policies with your coding agent and the `hapi-agent-prompt-generator` skill.

### Prepare a ChatGPT App submission
Run **Dry Run → JSON**. The tool names, descriptions and read-only/destructive hints are filled in from your contract. Complete the placeholders with the `hapi-apps-dump` skill.

### Run on a specific port or headless
Use **Run with HAPI (Options)…**: choose `--mcp`, `--headless` (MCP only) or `--dev` (hot reload), and a port. If the port is taken, OrcA offers the next free one.

### Orchestrate several API calls deterministically
Create an Arazzo workflow (**New Contract… → Arazzo Workflow**), point its `sourceDescriptions` at your OpenAPI files, validate it, then **Run with HAPI**. Each workflow is exposed as one MCP tool. See [HAPI Workflows](../../3-components/hapi-server/hapi-workflows.md).

### See what your agent sends to an MCP server
Right-click the running server → **Expose via Proxy**, then **Add to VS Code → Through OrcA (captured)**. Use Copilot as usual; each call appears in **OrcA Traffic** with its client name, latency and payload.

### Chat with an API before wiring an agent
**Connect** the server, open **OrcA → Chat**, pick a model with **Select Chat Model…** (VS Code language models need no key), and ask. Tools that can change data ask before running.

### Deploy an MCP server
Right-click an OpenAPI contract → **Deploy MCP Server** and name it. In **remote** mode (`orca.hapi.apiMode`), sign in first. Your HAPI profile decides the region and plan.

## Settings

| Setting | Default | Purpose |
| --- | --- | --- |
| `orca.contracts.include` / `exclude` | `**/*.{json,yaml,yml}` / `node_modules`, `dist`, `.git` | Workspace contract scan |
| `orca.hapi.home` | *(empty)* | HAPI Home override (else `$HAPI_HOME`, else `~/.hapi`) |
| `orca.hapi.cliPath` | `hapi` | HAPI CLI executable |
| `orca.hapi.serve.defaultArgs` | `["--mcp"]` | Arguments for Run with HAPI |
| `orca.hapi.apiMode` | `local` | `local` (no network calls) or `remote` |
| `orca.hapi.apiBaseUrl` / `wsBaseUrl` | `https://api.mcp.com.ai` / `wss://api.mcp.com.ai/ws` | HAPI API for remote mode |
| `orca.activity.enabled` / `retention` | `true` / `50` | Activity tab |
| `orca.llm.provider` / `model` / `baseUrl` | `vscode-lm` / *(empty)* / *(empty)* | Chat model (keys go in secret storage via **Set API Key…**) |
| `orca.chat.confirmTools` / `maxToolRounds` | `mutating` / `8` | Chat tool confirmation and round limit |
| `orca.traffic.maxFrames` | `5000` | Frames kept in memory |
| `orca.proxy.port` | `7331` | Capture proxy port (127.0.0.1) |

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| "Running MCP servers locally needs the HAPI CLI" | Choose **Install HAPI**, or set `orca.hapi.cliPath`. Check with **OrcA: Check HAPI CLI** |
| Server stays *provisioning*, then *error* | Open its terminal (**View Logs**) to see HAPI's error, for example a bad `$ref` or an unsupported Arazzo version |
| "Only Arazzo 1.1.x is supported" | Set `arazzo: 1.1.0` in the workflow; the Outline shows this hint for 1.0 documents |
| Server started on 3001 instead of 3000 | Port 3000 was in use; OrcA picked the next free port (see Activity) |
| "Connected, but skipped … catalog list(s)" | The server answered a list (for example `resources/templates/list`) with an invalid result; OrcA skipped it. The rest works |
| "This server requires OAuth" | OAuth MCP servers are not supported yet; use a static header (**Set Headers…**) if the server accepts one |
| Chat says "No API key" | Run **OrcA: Set API Key…**, set the provider's environment variable, or choose VS Code language models |
| A contract is not listed | Check that it declares `openapi: 3.x` or `arazzo: 1.x` at the root, and that it is not excluded by `orca.contracts.exclude` |
