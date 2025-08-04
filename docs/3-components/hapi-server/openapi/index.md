---
sidebar_position: 2
sidebar_label: OpenAPI Integration
sidebar_class_name: orange
title: 'OpenAPI Integration in HAPI Server: API-first with MCP'
description: 'Explore how HAPI server uses OpenAPI specifications to power API-first development, dynamic endpoint generation, and seamless Model Context Protocol (MCP) integration.'
keywords:
  - OpenAPI
  - Swagger
  - HAPI server
  - API-first
  - Model Context Protocol
  - MCP
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2025-07-27'
---

# OpenAPI Integration in HAPI Server: API-first with MCP

HAPI server is built around OpenAPI (Swagger) specifications. This enables you to define your API contract once and let HAPI generate, validate, and document all endpoints automatically.

## Why OpenAPI?
- **Single source of truth:** Your OpenAPI spec defines endpoints, parameters, security, and responses.
- **Automatic validation:** Every request and response is checked against the schema.
- **Live documentation:** HAPI can auto-generate Swagger UI and docs from your spec.
- **Easier integration:** Tools and agents can introspect and use the API contract programmatically.

:::tip
HAPI Server uses OpenAPI's `x-` extensions (e.g., `x-hapi`) to add custom metadata for HAPI-specific features or MCP context.
:::

## How HAPI Uses Your OpenAPI Schema
- **Endpoint generation:** Each path and method in your spec becomes a live endpoint.
- **Validation:** Parameters, request bodies, and responses are validated using the schema.
- **Security:** OpenAPI security schemes (OAuth2, API keys, etc.) are enforced automatically.
- **Custom extensions:** Add `x-hapi` fields for advanced routing, context, or tool integration.

### Example: Adding a Tools

Every single [OpenAPI path](https://swagger.io/specification/#paths-object) operation can be treated as a tool that agents can invoke. For example, if you have an endpoint to fetch weather data:

```yaml
paths:
  /weather/{city}:
    get:
      summary: Get weather
      description: Fetch current weather for a city
      operationId: getWeather
      responses:
        '200':
          description: Weather data
          content:
            application/json:
              schema:
                type: object
                properties:
                  temperature:
                    type: number
                    description: Current temperature in Celsius
                  condition:
                    type: string
                    description: Weather condition (e.g., sunny, rainy)
      parameters:
        - name: city
          in: path
          required: true
          schema:
            type: string
          description: Name of the city to fetch weather for
      tags:
        - Weather
```

This defines a tool `getWeather` that agents can call with a city parameter. HAPI will generate the endpoint and validate requests against this schema.

When an MCP client (like [chatMCP](https://chat.mcp.com.ai)) lists available tools, it will include this operation, allowing agents to invoke it with the required parameters.

```json
{
  "tools": [
    {
      "name": "getWeather",
      "description": "Fetch current weather for a city",
      "parameters": {
        "city": {
          "type": "string",
          "required": true
        }
      }
    }
  ]
}
```

:::caution
You SHOULD always define `operationId` for each operation. This helps HAPI and MCP agents map actions to code and tools reliably. Otherwise, HAPI Server will generate a default ID based on the path and method.
:::

### Example: Enabling OAuth2 Security

To secure your endpoints, you can define OAuth2 security in your OpenAPI spec. HAPI will handle the OAuth flow and token validation automatically. Other [OpenAPI security schemes](https://swagger.io/specification/#security-scheme-object) supported include API keys, HTTP basic auth, and more.

```yaml
components:
  securitySchemes:
    my_oauth2_config_object:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: https://auth.example.com/oauth/authorize
          tokenUrl: https://auth.example.com/oauth/token
          scopes:
            read:weather: Read weather data

x-hapi:
  security:
    - my_oauth2_config_object:
        client_id: $SECRETS.CLIENT_ID
        client_secret: $SECRETS.CLIENT_SECRET
```


## Best Practices
- Keep your OpenAPI spec up to date with your implementation.
- The most detailed and accurate your spec, the better the LLMs and agents can understand and use your API.
- Use OpenAPI extensions for custom logic or context (e.g., `x-hapi` for MCP integration).
- Leverage OpenAPI's built-in security and validation features for robust APIs.

## Further Reading
- [OpenAPI Specification](https://swagger.io/specification/)
- [HAPI MCP source code](https://github.com/la-rebelion/hapi-mcp)
