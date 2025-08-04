---
sidebar_position: 2
sidebar_label: Protobuf Integration
sidebar_class_name: orange
title: 'Protobuf Integration in HAPI Server: API-first with MCP'
description: 'Explore how HAPI server uses Protobuf (gRPC) specifications to power API-first development, dynamic RPC generation, and seamless Model Context Protocol (MCP) integration.'
keywords:
  - Protobuf
  - gRPC
  - HAPI server
  - API-first
  - Model Context Protocol
  - MCP
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2025-07-27'
badges:
  - type: beta
    description: Protobuf/gRPC support is in beta
  - type: roadmap
    description: Features coming soon
    color: #FFA500
---

# Protobuf Integration in HAPI Server: API-first with MCP

HAPI server is built around Protocol Buffers (protobuf) and gRPC specifications. This enables you to define your API contract once and let HAPI generate, validate, and document all RPCs automatically.

## Why Protobuf/gRPC?
- **Single source of truth:** Your protobuf spec defines messages, services, and RPCs.
- **Automatic validation:** Every request and response is checked against the schema.
- **Live documentation:** HAPI can auto-generate docs and code from your proto files.
- **Easier integration:** Tools and agents can introspect and use the API contract programmatically.

:::tip
Use protobuf options and extensions to add custom metadata for HAPI-specific features or MCP context.
:::

## How HAPI Uses Your Protobuf Schema
- **RPC generation:** Each service and method in your proto becomes a live RPC endpoint.
- **Validation:** Messages and responses are validated using the schema.
- **Security:** Use gRPC metadata and MCP context for authentication and authorization.
- **Custom extensions:** Add options for advanced routing, context, or tool integration.

### Example: Adding a Custom Tool Operation
```proto
service WeatherService {
  rpc GetWeather (WeatherRequest) returns (WeatherResponse) {
    option (mcp.tool) = true;
  }
}
```

### Example: Enabling Security
```proto
// Use gRPC metadata for OAuth2 tokens or API keys
```

:::caution
Always define unique method names for each RPC. This helps HAPI and MCP agents map actions to code and tools reliably.
:::

## Best Practices
- Keep your proto files up to date with your implementation.
- Use protobuf extensions for custom logic or context (e.g., MCP integration).
- Leverage gRPC's built-in security and validation features for robust APIs.

## Further Reading
- [Protocol Buffers Language Guide](https://protobuf.dev/programming-guides/proto3/)
- [HAPI MCP source code](https://github.com/la-rebelion/hapi-mcp)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
