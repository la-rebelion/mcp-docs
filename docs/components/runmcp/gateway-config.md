---
sidebar_position: 2
sidebar_label: Gateway Config
sidebar_class_name: orange
title: 'Gateway Configuration in RunMCP: API-first, OpenAPI, and MCP'
description: 'Learn how to configure the RunMCP gateway for API-first, OpenAPI-driven deployments, including dynamic routing, service registration, and best practices.'
keywords:
  - RunMCP
  - gateway config
  - OpenAPI
  - API-first
  - Model Context Protocol
  - MCP
  - dynamic routing
  - service registration
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2025-07-27'
---

# Gateway Configuration: RunMCP, OpenAPI, API-first

Configuring the RunMCP gateway is all about mapping OpenAPI-powered services to routes, subdomains, and plugins. The gateway reads your configuration and dynamically provisions endpoints and routing logic.

## Key Configuration Patterns
- **Service registration:** Define each service with its OpenAPI spec, base URL, and routing rules.
- **Dynamic subdomains:** Route requests to the correct backend based on subdomain or path.
- **Plugin hooks:** Attach plugins for authentication, logging, or custom logic.

:::tip
You can update gateway config via file or API—no need to restart the gateway for every change!
:::

### Example: Service Registration (YAML)
```yaml
services:
  - name: chatmcp
    openapi: ./chatmcp-openapi.json
    url: https://chatmcp.run.mcp.com.ai
    subdomain: chatmcp
  - name: hapi
    openapi: ./hapi-openapi.json
    url: https://hapi.run.mcp.com.ai
    subdomain: hapi
```

### Example: Dynamic Routing Rule
```yaml
routes:
  - match:
      subdomain: "*.run.mcp.com.ai"
    forwardTo: service
```

:::caution
Always validate your configuration before applying. Invalid routes or missing OpenAPI specs can cause downtime.
:::

## Best Practices
- Use descriptive service names and keep OpenAPI specs up to date
- Leverage plugins for security, monitoring, and custom needs
- Test routing and failover in staging before production

## Further Reading
- [run-mcp source code](https://github.com/la-rebelion/run-mcp)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
