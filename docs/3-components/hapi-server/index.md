---
sidebar_position: 1
sidebar_label: HAPI Server
sidebar_class_name: blue
title: 'HAPI Server: API-first approach for Model Context Protocol'
description: 'Discover the architecture and API-first design of the HAPI server, its seamless OpenAPI integration, and how it powers the Model Context Protocol (MCP) stack.'
keywords:
  - HAPI server
  - OpenAPI
  - API-first
  - Model Context Protocol
  - MCP
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2026-08-23'
---

# HAPI Server: API-first approach for Model Context Protocol

The HAPI server is a modern, API-first platform for building and exposing [headless APIs](/glossary#hapi---headless-api-stack-a-software-architecture-that-separates-the-business-logic-in-backend-services-from-the-client-layer-enabling-greater-flexibility-and-scalability). It is designed to work seamlessly with OpenAPI specifications, gRPC IDL, and the Model Context Protocol (MCP), enabling robust schema validation, dynamic routing, and secure integration for any context-driven application.

## What is the HAPI Server?
[HAPI](/glossary#h) (**Headless API**) is a lightweight, extensible server that:
- Accepts either OpenAPI specs or gRPC IDL as input
- Auto-generates RESTful endpoints and validation layers
- Translates API services into a context-aware, API-first architecture through MCP
- Companions with the [routing engine](/components/hapi-server/routing-engine) for advanced traffic management,
  - Supports dynamic subdomain routing and multi-tenancy
  - Included in the cloud [HAPI Stack](/glossary#h), optional in on-premise setups (BYO)

:::info[**API-first by default**]
HAPI treats your [API schema as the contract](https://rebelion.la/you-dont-need-to-implement-mcp-servers-a-contract-first-approach-to-ai-tool-integration?showSharer=true). All endpoints, validation, and docs are generated from your spec—no manual wiring required.
:::

## Core Features
- **API-driven:** Import your API (Swagger or IDL) schema to instantly generate endpoints
- **Validation layers:** Requests and responses are validated against your schema
- **Dynamic routing:** Easily manage subdomains and route traffic to the right tenant or instance
- **Security:** API-key, Basic, and static Bearer authentication via OpenAPI security schemes are supported out of the box in the free, open-source CLI. Interactive OAuth2 (an OAuth-protected document, with HAPI acting as the local OAuth broker for MCP clients) requires the licensed Enterprise Auth plugin — see [What's New in v1: Authentication & Licensing](/introduction/whats-new-in-v1#oauth-is-now-a-licensed-enterprise-feature).
  - For [gRPC authentication](https://grpc.io/docs/guides/auth/#extending-grpc-to-support-other-authentication-mechanisms), HAPI Server uses metadata and MCP context, or mutual TLS
- **Extensible:** Add custom logic, hooks, or middleware as needed
- **HAPI Workflows:** Expose supported Arazzo workflows as MCP tools that can coordinate documented OpenAPI operations

:::info[HAPI Workflows beta]
HAPI Workflows is available with the HAPI v1 beta Docker tags `workflows` and
`arazzo`. See [HAPI Workflows](/components/hapi-server/hapi-workflows) to
validate and serve an Arazzo document.
:::

## How HAPI Fits in the MCP Stack
HAPI acts as the API gateway and schema enforcer for MCP-powered systems. It ensures that every request and response conforms to the agreed contract, and provides the context hooks needed for advanced orchestration.

- **Schema-first:** Your OpenAPI spec is the source of truth
- **Context integration:** Passes context and session info to downstream services
- **Tooling:** Enables agent and tool invocation via OpenAPI-defined operations

:::tip[You Don’t Need to Implement MCP Servers Yourself]
You don’t need to implement your own MCP servers to benefit from the protocol. The HAPI Stack provides reference implementations, so you can focus on designing your flows and context models, not infrastructure.
:::

## Example: Bootstrapping HAPI with OpenAPI
```bash
hapi serve linkedin --port 443 --headless --cert ./certs/cert.pem --key ./certs/key.pem
```

This command starts the HAPI server for the "linkedin" project, using the specified SSL certificate and key for secure connections.

:::caution
Always keep your OpenAPI spec up to date! Out-of-sync schemas can cause validation errors and break API consumers.
:::

## Further Reading
- [HAPI MCP source code](https://github.com/mcp-com-ai/hapimcp)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol)
