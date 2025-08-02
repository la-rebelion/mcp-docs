---
sidebar_position: 1
sidebar_label: RunMCP
sidebar_class_name: blue
title: 'RunMCP: Gateway, API-first, OpenAPI, and Model Context Protocol'
description: 'Learn how RunMCP acts as a flexible, API-first gateway for MCP deployments, leveraging OpenAPI for dynamic routing, scaling, and plugin extensibility.'
keywords:
  - RunMCP
  - gateway
  - OpenAPI
  - API-first
  - Model Context Protocol
  - MCP
  - deployment
  - scaling
  - plugins
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2025-07-27'
---

# RunMCP: Gateway, API-first, OpenAPI, and MCP

RunMCP is the gateway and orchestrator for the Model Context Protocol (MCP) stack. It enables API-first deployments, dynamic routing, and seamless integration of OpenAPI-powered services, making it easy to scale, secure, and extend your MCP-based architecture.

## What is RunMCP?
RunMCP is a lightweight, extensible gateway designed to:
- Route API requests to the correct MCP or HAPI server instance
- Manage gateway configuration and dynamic subdomain routing
- Support multi-tenancy and plugin-based extensibility
- Integrate tightly with OpenAPI for contract-driven deployments

:::tip
RunMCP enables zero-config onboarding for new services—just register your OpenAPI spec and go live!
:::

## Core Features
- **API-first gateway:** All routing and orchestration is driven by OpenAPI specs
- **Dynamic configuration:** Easily add, remove, or update services via config or API
- **Scalable:** Supports horizontal scaling and high-availability
- **Plugin system:** Extend with custom plugins for auth, logging, monitoring, and more

## Example: Registering a New Service
```js
// Pseudocode for registering a new MCP service
gateway.registerService({
  name: 'chatmcp',
  openapi: require('./chatmcp-openapi.json'),
  url: 'https://chatmcp.run.mcp.com.ai'
});
```

:::caution
Always validate your OpenAPI specs before registering new services. Invalid schemas can break routing and orchestration.
:::

## Further Reading
- [run-mcp source code](https://github.com/la-rebelion/run-mcp)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
