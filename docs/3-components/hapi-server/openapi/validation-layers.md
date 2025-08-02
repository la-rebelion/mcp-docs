---
sidebar_position: 4
sidebar_label: Validation Layers
sidebar_class_name: blue
title: 'Validation Layers in HAPI Server: MCP, OpenAPI, API-first'
description: 'Explore the layered validation strategies in HAPI server, including OpenAPI schema validation and Model Context Protocol (MCP) context enforcement.'
keywords:
  - validation
  - OpenAPI
  - HAPI server
  - API-first
  - Model Context Protocol
  - MCP
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2025-07-27'
---

# Validation Layers: MCP, OpenAPI, API-first

HAPI server applies multiple layers of validation to every API request and response, ensuring your system is robust, secure, and always in sync with your OpenAPI contract.

## Validation Layers in HAPI
1. **Schema Validation:** All data is validated against your OpenAPI schema (types, formats, enums, etc.).
2. **Security Validation:** Authentication and authorization are enforced using OpenAPI security schemes (OAuth2, API keys, etc.).
3. **Context Validation:** MCP context is checked for required fields and permissions.
4. **Custom Validation:** Add hooks for business logic or additional checks as needed.

:::tip
Use OpenAPI's `required`, `format`, and `enum` keywords for strong schema validation. Combine with MCP context checks for full coverage.
:::

### Example: Request Validation
```yaml
paths:
  /users:
    post:
      summary: Create user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/User'
      responses:
        '201':
          description: User created
```

### Example: Security Validation
```yaml
components:
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: X-API-KEY
```

:::caution
If your schema and implementation drift, validation errors will occur. Always update your OpenAPI spec when making changes to your API.
:::

## Best Practices
- Use tools like Swagger Editor to validate your schema.
- Test all endpoints with valid and invalid data.
- Use descriptive error messages for validation failures.

## Further Reading
- [OpenAPI Validation](https://swagger.io/docs/specification/data-models/validation/)
- [HAPI MCP source code](https://github.com/la-rebelion/hapi-mcp)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)