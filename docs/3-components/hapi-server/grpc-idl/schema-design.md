---
sidebar_position: 3
sidebar_label: Schema Design (gRPC)
sidebar_class_name: green
title: 'Schema Design in HAPI Server: API-first, Protobuf, and MCP'
description: 'Learn best practices for designing robust, maintainable gRPC schemas in HAPI server using Protocol Buffers and Model Context Protocol (MCP) principles.'
keywords:
  - schema design
  - Protobuf
  - MCP
  - HAPI server
  - API-first
  - validation
  - contract
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2025-07-27'
---

# Schema Design: API-first, Protobuf, and MCP

Schema design is the foundation of any API-first system. In HAPI, your Protocol Buffers (protobuf) schema defines not just RPC methods, but also the structure, validation, and semantics of every request and response.

## Principles of Good Protobuf Schema Design
- **Explicitness:** Define all fields, types, and constraints clearly.
- **Validation:** Use field options, types, and custom validation logic.
- **Reusability:** Use message definitions and imports to avoid duplication.
- **Extensibility:** Leverage protobuf extensions for MCP-specific needs.

:::tip
Design your protobuf schemas with future agents and tools in mind. Well-structured schemas make it easier for MCP-powered agents to reason about and use your API.
:::

## Example: User Message
```proto
message User {
  string id = 1;
  string name = 2;
  string email = 3;
  repeated string roles = 4;
}
```

## Using Enums and Constraints
```proto
enum Status {
  ACTIVE = 0;
  INACTIVE = 1;
  PENDING = 2;
}
```

:::caution
Avoid using generic types like `google.protobuf.Any` unless necessary. This can make validation and documentation less effective.
:::

## Best Practices
- Use message definitions to share common models across RPCs.
- Document all fields, even optional ones, using comments.
- Use field options for validation and constraints.
- Validate with tools like `protoc` and gRPC code generators.

## Further Reading
- [Protocol Buffers Language Guide](https://protobuf.dev/programming-guides/proto3/)
- [HAPI MCP source code](https://github.com/la-rebelion/hapi-mcp)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
