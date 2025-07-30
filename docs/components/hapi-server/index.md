---
sidebar_position: 1
sidebar_label: HAPI Server
sidebar_class_name: blue
title: 'HAPI Server: API-first, OpenAPI, and Model Context Protocol'
description: 'Discover the architecture and API-first design of the HAPI server, its seamless OpenAPI integration, and how it powers the Model Context Protocol (MCP) stack.'
keywords:
  - HAPI server
  - OpenAPI
  - API-first
  - Model Context Protocol
  - MCP
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2025-07-27'
---

# HAPI Server: API-first, OpenAPI, and MCP

The HAPI server is a modern, API-first platform for building and exposing headless APIs. It is designed to work seamlessly with OpenAPI specifications and the Model Context Protocol (MCP), enabling robust schema validation, dynamic routing, and secure integration for any context-driven application.

## What is the HAPI Server?
HAPI (Headless API) is a lightweight, extensible server that:
- Accepts OpenAPI/Swagger schemas as input
- Auto-generates RESTful endpoints and validation layers
- Integrates with MCP for context-aware operations
- Supports dynamic subdomain routing and multi-tenancy

:::tip
**API-first by default:** HAPI treats your OpenAPI schema as the contract. All endpoints, validation, and docs are generated from your spec—no manual wiring required.
:::

## Core Features
- **OpenAPI-driven:** Import your OpenAPI (Swagger) schema to instantly generate endpoints
- **Validation layers:** Requests and responses are validated against your schema
- **Dynamic routing:** Easily manage subdomains and route traffic to the right tenant or instance
- **Security:** Supports OAuth2, API keys, and custom auth via OpenAPI security schemes
- **Extensible:** Add custom logic, hooks, or middleware as needed

## How HAPI Fits in the MCP Stack
HAPI acts as the API gateway and schema enforcer for MCP-powered systems. It ensures that every request and response conforms to the agreed contract, and provides the context hooks needed for advanced orchestration.

- **Schema-first:** Your OpenAPI spec is the source of truth
- **Context integration:** Passes context and session info to downstream services
- **Tooling:** Enables agent and tool invocation via OpenAPI-defined operations

## Example: Bootstrapping HAPI with OpenAPI
```js
// Pseudocode for starting HAPI server with a schema
const schema = require('./openapi.json');
const hapiServer = new HAPIServer({ schema });
hapiServer.listen(8080);
```

:::caution
Always keep your OpenAPI spec up to date! Out-of-sync schemas can cause validation errors and break API consumers.
:::

## Further Reading
- [HAPI MCP source code](https://github.com/la-rebelion/hapi-mcp)
- [apicove-hapi source code](https://github.com/la-rebelion/apicove-hapi)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
