---
sidebar_position: 5
sidebar_label: Plugin System
sidebar_class_name: orange
title: 'Plugin System: RunMCP, OpenAPI, API-first'
description: 'Extend RunMCP with plugins for authentication, logging, monitoring, and custom logic in API-first, OpenAPI-driven workflows.'
keywords:
  - RunMCP
  - plugin system
  - OpenAPI
  - API-first
  - Model Context Protocol
  - MCP
  - extensibility
  - middleware
  - hooks
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2025-07-27'
---

# Plugin System: RunMCP, OpenAPI, API-first

The RunMCP plugin system lets you add new features, integrations, and custom logic to your gateway without modifying core code.

## Plugin Patterns
- **Authentication plugins:** Add OAuth, API key, or custom auth
- **Logging and monitoring:** Integrate with observability tools
- **Custom routing:** Add new routing rules or traffic shaping
- **Hooks and middleware:** Run code before/after requests

:::tip
Design plugins to be stateless and configurable for maximum reusability.
:::

### Example: Registering a Plugin (YAML)
```yaml
plugins:
  - name: auth-oauth2
    type: authentication
    config:
      clientId: "..."
      clientSecret: "..."
  - name: logging
    type: logging
    config:
      provider: datadog
```

### Example: Plugin Hook (JS)
```js
// Pseudocode for a plugin hook
gateway.on('beforeRequest', (req, res, next) => {
  // Custom logic here
  next();
});
```

:::caution
Test plugins in a staging environment before deploying to production. Misconfigured plugins can impact all traffic.
:::

## Best Practices
- Document plugin APIs and configuration
- Use versioning for plugins
- Monitor plugin performance and errors

## Further Reading
- [run-mcp source code](https://github.com/la-rebelion/run-mcp)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
