---
sidebar_position: 4
sidebar_label: Validation Layers (gRPC)
sidebar_class_name: blue
title: 'Validation Layers in HAPI Server: MCP, Protobuf, API-first'
description: 'Explore the layered validation strategies in HAPI server, including Protobuf schema validation and Model Context Protocol (MCP) context enforcement for gRPC APIs.'
keywords:
  - validation
  - Protobuf
  - HAPI server
  - API-first
  - Model Context Protocol
  - MCP
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2025-07-27'
---

# Validation Layers: MCP, Protobuf, API-first

HAPI server applies multiple layers of validation to every gRPC request and response, ensuring your system is robust, secure, and always in sync with your protobuf contract.

## Validation Layers in HAPI (gRPC)
1. **Schema Validation:** All data is validated against your protobuf message definitions (types, enums, etc.).
2. **Security Validation:** Authentication and authorization are enforced using MCP context and gRPC metadata.
3. **Context Validation:** MCP context is checked for required fields and permissions.
4. **Custom Validation:** Add hooks for business logic or additional checks as needed.

:::tip
Use protobuf field options and enums for strong schema validation. Combine with MCP context checks for full coverage.
:::

### Example: Request Validation
```proto
rpc CreateUser (User) returns (UserResponse);
```

### Example: Security Validation
```proto
// Use gRPC metadata for API keys or tokens
```

:::caution
If your schema and implementation drift, validation errors will occur. Always update your protobuf definitions when making changes to your API.
:::

## Best Practices
- Use tools like `protoc` to validate your schema.
- Test all RPCs with valid and invalid data.
- Use descriptive error messages for validation failures.

## Further Reading
- [Protobuf Validation](https://protobuf.dev/programming-guides/proto3/)
- [HAPI MCP source code](https://github.com/la-rebelion/hapi-mcp)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
