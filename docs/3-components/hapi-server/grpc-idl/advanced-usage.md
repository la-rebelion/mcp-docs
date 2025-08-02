---
sidebar_position: 5
sidebar_label: Advanced Usage (gRPC)
sidebar_class_name: orange
title: 'Advanced Usage: HAPI Server, Protobuf, MCP'
description: 'Explore advanced usage patterns and extensibility in HAPI server for API-first, Protobuf-driven, and Model Context Protocol (MCP) deployments.'
keywords:
  - advanced
  - HAPI server
  - Protobuf
  - API-first
  - Model Context Protocol
  - MCP
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2025-07-27'
---

# Advanced Usage: HAPI Server, Protobuf, MCP

HAPI server offers advanced features for teams who need more than just basic gRPC scaffolding. From custom interceptors to dynamic routing and multi-tenancy, HAPI is built for extensibility.

## Advanced Patterns
- **Custom Interceptors:** Inject logic before or after RPCs (logging, metrics, transformations).
- **Dynamic Routing:** Route traffic based on service, method, or context (great for SaaS/multi-tenant platforms).
- **Multi-Tenancy:** Isolate data and logic per tenant using context and dynamic routing.
- **Tool and Agent Integration:** Expose agent tools as gRPC methods, enabling automation and orchestration.
- **Custom Error Handling:** Define global or method-specific error handlers.

:::tip
Use protobuf extensions and gRPC interceptors to define custom behaviors or hooks for your services.
:::

### Example: Custom Interceptor
```js
// Pseudocode for gRPC interceptor
function interceptor(call, callback, next) {
  // Add custom headers or logging
  next();
}
```

### Example: Multi-Tenancy with Context
```js
// Pseudocode for dynamic routing
if (call.metadata.get('tenant')) {
  // Route to tenant-specific logic
}
```

:::caution
Advanced features may require deeper understanding of gRPC internals and protobuf extensions. Test thoroughly before deploying to production.
:::

## Best Practices
- Document all custom interceptors and extensions.
- Use protobuf extensions for custom features.
- Test advanced features in staging before production.

## Further Reading
- [HAPI MCP source code](https://github.com/la-rebelion/hapi-mcp)
- [apicove-hapi source code](https://github.com/la-rebelion/apicove-hapi)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
