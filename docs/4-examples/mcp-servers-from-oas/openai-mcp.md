---
title: "OpenAI MCP Server: Integration Guide"
description: "Learn how to build a lean, efficient Model Context Protocol (MCP) server for OpenAI using HAPI CLI. Optimize token usage and focus your AI agents."
keywords:
  - OpenAI MCP Server
  - HAPI MCP
  - Model Context Protocol
  - API Integration
  - OpenAI API
  - MCP Tools
authors:
  - adrian
---

Integrating the OpenAI API into a Model Context Protocol (MCP) server is a powerful way to give your AI agents advanced capabilities. With the [HAPI CLI](/components/hapi-server/hapi-cli), you can quickly wrap OpenAI's endpoints into a standardized MCP interface.

### The Challenge: Token Bloat

The OpenAI API is extensive. Wrapping the entire API into a single MCP server is generally not recommended due to **token bloat**. When an MCP client (like Claude) loads server tools, it consumes tokens for each tool definition in the context. Loading hundreds of OpenAI tools simultaneously can lead to unmanageable context windows and increased costs.

For a deeper dive into this issue, see [How to scale MCP to thousands of tools without destroying your budget](https://mcp.com.ai/mcp-at-scale/how-to-scale-mcp-to-thousands-of-tools-without-destroying-budget).

### Our Approach: Focused MCP Servers

Instead of a monolithic server, we recommend creating **focused MCP servers** that expose only the specific functionality your application needs. In this guide, we will create a minimal MCP server that specifically exposes OpenAI's **image** and **audio generation** capabilities.

---

## Prerequisites

Before starting, ensure you have:
1.  An **OpenAI API Key**: [Get one here](https://platform.openai.com/api-keys). You will need this to authenticate your MCP server from your AI agents/MCP clients.
2.  **HAPI MCP CLI**: Follow the installation steps below.

:::note
You can also include the API key as part of the MCP server configuration using the [`x-hapi.security`](/components/hapi-server/openapi#example-enabling-oauth2-security) extension in your OpenAPI spec, mapped to the `security schemes`. It is safe, as long as you **do not share the spec publicly**.
:::

## Steps to Create an OpenAI MCP Server

### 1. Install HAPI MCP

The easiest way to install the HAPI MCP CLI is via our install script:

```bash
curl -fsSL https://get.mcp.com.ai/hapi.sh | bash
```

For more installation options, visit the [HAPI CLI documentation](/components/hapi-server/hapi-cli) or the [HAPI MCP Microsite](https://hapi.mcp.com.ai).

### 2. Download OpenAI Tools OAS

```bash
curl -o ~/.hapi/specs/openai-tools.yaml https://docs.mcp.com.ai/servers-apis/openapi/openai-tools.yaml
```

### 3. Start the MCP Server

Use the `hapi serve` command to launch the server. We are using the HAPI MCP pre-configured OpenAI Tools specification designed for images and audio:

```bash
hapi serve openai-tools --headless --port 3030 --url https://api.openai.com/v1
```

This OAS is a **slimmed-down version** of the [full OpenAI API](https://github.com/openai/openai-openapi/releases) from OpenAI's GitHub, focusing on image generation and audio transcription endpoints.

### 4. Test and Integrate

Once the server is running, you can connect it to any MCP-aware client:

*   **[chatMCP](https://chat.mcp.com.ai)**: A powerful web client for testing MCP servers.
*   **[VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers#_add-an-mcp-server)**: Add the server to your GitHub Copilot configuration.
*   **[LibreChat](https://www.librechat.ai)**: Use OpenAI tools directly within your chat interface.

**An easy way to inspect the MCP server** endpoints is to pipe the output of the server into the MCP Inspector:

```bash
hapi serve openai-tools --headless --port 3030 --url https://api.openai.com/v1 | bunx @modelcontextprotocol/inspector
```

---

## Advanced: Claude Code Skills

If you are a Claude user, you can leverage [Claude Code Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) to build even more sophisticated agents. By connecting your OpenAI MCP server, Claude can intelligently decide when to generate an image or transcribe audio based on the conversation flow.

Are you a Codex user? You can also connect the OpenAI [MCP with Codex](https://developers.openai.com/codex/mcp) - interested in learning how? Check out our blog, we publish frequent updates on new MCP integrations and use cases! ✊🏼

---

## Deployment Options

### Docker Example

For production environments, you can run the OpenAI MCP server as a Docker container. This allows for easy scaling and environment management.

```sh
docker run --name hapi-openai -d \
  -p 3030:3030 \
  hapimcp/hapi-cli:latest serve \
  --openapi https://docs.mcp.com.ai/servers-apis/openapi/openai-tools.yaml \
  --headless \
  --url https://api.openai.com/v1
```

### Further Resources

*   [HAPI MCP Deployment Guide](/deployment)
*   [Docker Deployment](/deployment/docker)

Find more ways to deploy in our [Deployment documentation](/deployment), including Cloudflare and other cloud providers.
