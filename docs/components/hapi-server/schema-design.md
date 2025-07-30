---
sidebar_position: 3
sidebar_label: Schema Design
sidebar_class_name: green
title: 'Schema Design in HAPI Server: API-first, OpenAPI, and MCP'
description: 'Learn best practices for designing robust, maintainable schemas in HAPI server using OpenAPI and Model Context Protocol (MCP) principles.'
keywords:
  - schema design
  - OpenAPI
  - MCP
  - HAPI server
  - API-first
  - validation
  - contract
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2025-07-27'
---

# Schema Design: API-first, OpenAPI, and MCP

Schema design is the foundation of any API-first system. In HAPI, your OpenAPI schema defines not just endpoints, but also the structure, validation, and semantics of every request and response.

## Principles of Good Schema Design
- **Explicitness:** Define all fields, types, and constraints clearly.
- **Validation:** Use OpenAPI's built-in validation keywords (`type`, `format`, `enum`, `pattern`, etc.).
- **Reusability:** Use `$ref` and `components/schemas` to avoid duplication.
- **Extensibility:** Leverage OpenAPI extensions (e.g., `x-hapi`) for MCP-specific needs.

:::tip
Design your schemas with future agents and tools in mind. Well-structured schemas make it easier for MCP-powered agents to reason about and use your API.
:::

## Example: User Schema
```yaml
components:
  schemas:
    User:
      type: object
      required:
        - id
        - name
      properties:
        id:
          type: string
        name:
          type: string
        email:
          type: string
          format: email
        roles:
          type: array
          items:
            type: string
```

## Using Enums and Constraints
```yaml
components:
  schemas:
    Status:
      type: string
      enum: [active, inactive, pending]
```

:::caution
Avoid using overly generic types (like `object` or `any`). This can make validation and documentation less effective.
:::

## Best Practices
- Use `$ref` to share common models across endpoints.
- Document all fields, even optional ones.
- Use OpenAPI's `description` fields for clarity.
- Validate with tools like Swagger Editor or openapi-generator.

## Further Reading
- [OpenAPI Schema Object](https://swagger.io/specification/#schema-object)
- [HAPI MCP source code](https://github.com/la-rebelion/hapi-mcp)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
