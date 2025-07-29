---
sidebar_position: 2
sidebar_label: OpenAPI Integration
sidebar_class_name: orange
---
import JSONLD from '@theme/JSONLD';

# OpenAPI Integration in HAPI Server: API-first with MCP

<JSONLD data={{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "OpenAPI Integration in HAPI Server: API-first with MCP",
  "description": "Explore how HAPI server uses OpenAPI specifications to power API-first development, dynamic endpoint generation, and seamless Model Context Protocol (MCP) integration.",
  "keywords": "OpenAPI, Swagger, HAPI server, API-first, Model Context Protocol, MCP, schema, validation, dynamic API",
  "author": {
    "@type": "Organization",
    "name": "La Rebelion",
    "url": "https://github.com/la-rebelion"
  },
  "publisher": {
    "@type": "Organization",
    "name": "MCP Project",
    "url": "https://github.com/la-rebelion/mcp-docs"
  },
  "dateModified": "2025-07-27"
}} />

HAPI server is built around OpenAPI (Swagger) specifications. This enables you to define your API contract once and let HAPI generate, validate, and document all endpoints automatically.

## Why OpenAPI?
- **Single source of truth:** Your OpenAPI spec defines endpoints, parameters, security, and responses.
- **Automatic validation:** Every request and response is checked against the schema.
- **Live documentation:** HAPI can auto-generate Swagger UI and docs from your spec.
- **Easier integration:** Tools and agents can introspect and use the API contract programmatically.

:::tip
Use OpenAPI's `x-` extensions (e.g., `x-hapi`) to add custom metadata for HAPI-specific features or MCP context.
:::

## How HAPI Uses Your OpenAPI Schema
- **Endpoint generation:** Each path and method in your spec becomes a live endpoint.
- **Validation:** Parameters, request bodies, and responses are validated using the schema.
- **Security:** OpenAPI security schemes (OAuth2, API keys, etc.) are enforced automatically.
- **Custom extensions:** Add `x-hapi` fields for advanced routing, context, or tool integration.

### Example: Adding a Custom Tool Operation
```yaml
paths:
  /weather:
    get:
      summary: Get weather
      operationId: getWeather
      x-hapi:
        tool: true
      responses:
        '200':
          description: Weather data
```

### Example: Enabling OAuth2 Security
```yaml
components:
  securitySchemes:
    OAuth2:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: https://auth.example.com/oauth/authorize
          tokenUrl: https://auth.example.com/oauth/token
          scopes:
            read:weather: Read weather data
```

:::caution
Always define `operationId` for each operation. This helps HAPI and MCP agents map actions to code and tools reliably.
:::

## Best Practices
- Keep your OpenAPI spec up to date with your implementation.
- Use OpenAPI extensions for custom logic or context (e.g., `x-hapi` for MCP integration).
- Leverage OpenAPI's built-in security and validation features for robust APIs.

## Further Reading
- [OpenAPI Specification](https://swagger.io/specification/)
- [HAPI MCP source code](https://github.com/la-rebelion/hapi-mcp)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
