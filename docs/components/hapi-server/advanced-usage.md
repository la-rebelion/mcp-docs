---
sidebar_position: 5
sidebar_label: Advanced Usage
sidebar_class_name: orange
title: 'Advanced Usage: HAPI Server, OpenAPI, MCP'
description: 'Explore advanced usage patterns and extensibility in HAPI server for API-first, OpenAPI-driven, and Model Context Protocol (MCP) deployments.'
keywords:
  - advanced
  - HAPI server
  - OpenAPI
  - API-first
  - Model Context Protocol
  - MCP
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2025-07-27'
---

# Advanced Usage: HAPI Server, OpenAPI, MCP

HAPI server offers advanced features for teams who need more than just basic API scaffolding. From custom hooks to dynamic routing and multi-tenancy, HAPI is built for extensibility.

## Advanced Patterns
- **Custom Middleware:** Inject logic before or after requests (logging, metrics, transformations).
- **Dynamic Routing:** Route traffic based on subdomain, path, or context (great for SaaS/multi-tenant platforms).
- **Multi-Tenancy:** Isolate data and logic per tenant using context and dynamic routing.
- **Tool and Agent Integration:** Expose agent tools as OpenAPI operations, enabling automation and orchestration.
- **Custom Error Handling:** Define global or route-specific error handlers.

:::tip
Use OpenAPI's `x-` extensions to define custom behaviors or hooks for your endpoints.
:::

### Example: Custom Middleware
```js
hapiServer.use(async (req, res, next) => {
  // Add custom headers or logging
  next();
});
```

### Example: Multi-Tenancy with Subdomains
```js
// Pseudocode for dynamic routing
if (req.hostname.endsWith('.customer.com')) {
  // Route to customer-specific logic
}
```

:::caution
Advanced features may require deeper understanding of HAPI internals and OpenAPI extensions. Test thoroughly before deploying to production.
:::

## Best Practices
- Document all custom middleware and extensions.
- Use OpenAPI extensions for custom features.
- Test advanced features in staging before production.

## Further Reading
- [HAPI MCP source code](https://github.com/la-rebelion/hapi-mcp)
- [apicove-hapi source code](https://github.com/la-rebelion/apicove-hapi)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
