---
sidebar_position: 2
sidebar_label: Quickstart
sidebar_class_name: orange
title: 'Quickstart: MCP, OpenAPI, API-first'
description: 'Get started with Model Context Protocol (MCP) and OpenAPI: step-by-step guide to your first API-first, context-driven project.'
keywords:
  - MCP
  - quickstart
  - OpenAPI
  - API-first
  - setup
  - onboarding
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2025-07-27'
---

# Quickstart: MCP, API-first

:::tip
Choose your onboarding path: cloud for instant access, on-premise for full control.
:::

## 1. Choose Deployment Mode

### Cloud (Recommended for Most Teams)
- **runMCP:** [Create an account](https://run.mcp.com.ai) to manage servers and orchestrate APIs. The community has created many public APIs you can use or you can create your own.
- **chatMCP:** [Create an account](https://chat.mcp.com.ai) to integrate agents and interact with APIs via chat. You have access to public APIs created by the community or connect your own.
- No installation required—just sign up and start building.

### On-Premise (Advanced/Enterprise)
- Start HAPI Servers manually on your infrastructure.
- Use La Rebelion's bash scripts to set up local DNS (Caddy + API wrapper).
- Review prerequisites and ensure your team is ready for manual operations.

:::tip
Need help? Contact us for support or <span class="button">[request a demo](https://go.rebelion.la/demo-request)</span> to get access to the scripts and tools.
:::

## 2. Explore Example Projects

- For cloud, [log in](https://run.mcp.com.ai) and follow the onboarding guides in the webapp.
- For on-premise:
  
  - Install the corresponding binary and start the servers.
  - Or download the release from [GitHub](https://github.com/la-rebelion/hapimcp/releases).

```sh
# Check available API Specs
hapi list
# Start the example project
hapi serve example --mcp --headless
``` 

## 3. Access the API

- Cloud: Use the provided dashboard and API docs.
- On-premise: you can either use the CLI or any MCP client (must support `HTTP` protocol):

  * Open your browser and navigate to [http://localhost:8080/swagger](http://localhost:8080/swagger) to access the OpenAPI documentation or *test the APIs* in your browser.
  * Use any MCP client to connect to the server, such as [chatMCP](https://chat.mcp.com.ai), [MCP Inspector](https://www.npmjs.com/package/@modelcontextprotocol/inspector), [Postman](https://www.postman.com/downloads/) or curl.

More detailed instructions to access and test the MCP tools are available in the [Hello World guide](./getting-started/hello-world.md).

:::caution[Remember 🎗️]
On-premise setup requires manual server start and DNS configuration. Use provided scripts for Caddy setup or BYO DNS.
:::

## Next Steps

- Edit the OpenAPI schema to add endpoints.
- Explore context and memory features in MCP.
- Deploy to production (see [Deployment Guide](./deployment/)).

## Further Reading

- [runMCP](https://run.mcp.com.ai)
- [chatMCP](https://chat.mcp.com.ai)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
- [OpenAPI Specification](https://swagger.io/specification/)
