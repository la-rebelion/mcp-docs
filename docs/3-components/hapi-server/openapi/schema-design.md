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
Avoid using overly generic types (like `object`). This can make validation and documentation less effective.
:::

## Request bodies and MCP tool arguments

In OpenAPI 3, an operation payload is described by `requestBody`. Unlike a
parameter, an inline `requestBody` does not have its own name. HAPI must give
that payload a name when it creates an MCP tool input schema, so that body
fields never collide with path, query, or header parameters.

This naming applies to the MCP tool's `arguments` object only. The request sent
to your API still uses the raw JSON payload defined by the OpenAPI document.

### Inline request bodies

For an inline body, HAPI uses `<operationId>Body`. Give every payload-bearing
operation a stable, unique `operationId` so the tool contract is predictable.

```yaml
paths:
  /orders:
    post:
      operationId: placeOrder
      summary: Place an order
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [customer, tacos]
              properties:
                customer:
                  type: object
                tacos:
                  type: array
                  items:
                    type: object
      responses:
        '201':
          description: Order created
```

HAPI exposes this as the `placeOrder` MCP tool. Call it with the body nested
under `placeOrderBody`:

```json
{
  "name": "placeOrder",
  "arguments": {
    "placeOrderBody": {
      "customer": { "name": "Ada" },
      "tacos": [{ "id": "taco-1", "quantity": 2 }]
    }
  }
}
```

If an operation has no `operationId`, HAPI generates one from its method and
path. Its generated `...Body` property is visible in `tools/list`, but defining
an `operationId` yourself is recommended because it makes the tool and body
names stable as the API evolves.

### Reusable request bodies

When several operations use the same payload, define it once in
`components.requestBodies` and reference it. In this case the component key is
the MCP argument name. This provides an explicit, reusable name instead of an
operation-specific one.

```yaml
components:
  requestBodies:
    PlaceOrderBody:
      description: Customer and taco selections for a new order
      required: true
      content:
        application/json:
          schema:
            type: object
            required: [customer, tacos]
            properties:
              customer:
                type: object
              tacos:
                type: array
                items:
                  type: object

paths:
  /orders:
    post:
      operationId: placeOrder
      requestBody:
        $ref: '#/components/requestBodies/PlaceOrderBody'
      responses:
        '201':
          description: Order created
```

The resulting MCP call uses `PlaceOrderBody`:

```json
{
  "name": "placeOrder",
  "arguments": {
    "PlaceOrderBody": {
      "customer": { "name": "Ada" },
      "tacos": [{ "id": "taco-1", "quantity": 2 }]
    }
  }
}
```

:::tip
Use a clear, unique component key such as `CreateInvoiceBody` or
`PlaceOrderBody`. It becomes part of the MCP tool contract when the reusable
body is referenced. Use an `operationId`-based inline body when the payload is
specific to one operation.
:::

OpenAPI uses `requestBody.content` to map media types to their schemas, and
supports reusable bodies through `components.requestBodies` and `$ref`. See
[Swagger's request-body guide](https://swagger.io/docs/specification/v3_0/describing-request-body/describing-request-body/) and the
[OpenAPI 3.0 Request Body Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.4.md#request-body-object)
for the standard syntax.

## `oneOf`, What is it? When and How to use it?

JSON Schema is a powerful tool for validating complex data structures. The [`oneOf`](https://swagger.io/docs/specification/v3_0/data-models/oneof-anyof-allof-not/#oneof) keyword allows you to specify that a value must match exactly one of the given schemas, **valid against exactly one** (XOR) of the subschemas.

```yaml
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
        type:
          oneOf:
            - const: "admin"
            - const: "user"
```

When you design your schemas, consider how they will be used by both humans and machines. Clear, concise schemas improve developer experience and reduce errors. For instance, if your API defines a `path` parameter that can accept multiple types, using [`oneOf`](https://json-schema.org/understanding-json-schema/reference/combining#anyOf) can make this explicit. Unfortunately, in the MCP context, the use of `oneOf` can be limited by the need for more specific type information, agents (human-like) need to understand the context better.

### Approaches for Handling `oneOf` Schemas in MCP Input Generation

When creating JSON schemas for tools in the Model Context Protocol (MCP), using the `oneOf` keyword can be challenging. If your API needs to accept different object types in the `requestBody`, `oneOf` helps you list all allowed types. However, you must define every possible type in advance, both on the client and server sides. At runtime, choosing the correct type can be difficult.

In the HAPI Server, we solved this by combining client-side type hints with server-side validation. Here are the options we considered:

1. Use a Discriminator Property
2. Generate Separate Tool Definitions
3. Merge All Properties into One Schema
4. Resolve Schemas Dynamically

We chose **option 2: Generate Separate Tool Definitions** because:

- It does not change the original schema.
- API consumers do not need to make any changes.
- It keeps each type exclusive, so invalid combinations are avoided.
- It allows tools to be created as needed, making the system flexible.

This approach makes it easier for both humans and machines to work with the API, and helps prevent errors.

#### Tool Definition example

```yaml
# ... remove other methods for simplicity
    post:
      # ... removed content for simplicity
      requestBody:
        required: true
        content:
          application/json:
            schema:
              oneOf:        # <-- This indicates that the request body must match exactly one of the specified schemas
                - title: 'Person'
                  properties:
                    name:
                      type: string
                    age:
                      type: integer
                - title: 'Company'
                  properties:
                    name:
                      type: string
                    registrationNumber:
                      type: string
                      format: uuid
# ... removed content for simplicity
```

In this example, the `oneOf` construct is used to define two possible schemas for the request body: one for a `Person` and another for a `Company`. This creates separate tool definitions for each schema variant:

```
Tool 1: createPerson
Tool 2: createCompany
```

Each with its own schema definition, instead of trying to represent a union type.

## Best Practices
- Use `$ref` to share common models across endpoints.
- Document all fields, even optional ones.
- Use OpenAPI's `description` fields for clarity.
- Validate with tools like Swagger Editor or openapi-generator.

## Further Reading
- [OpenAPI Schema Object](https://swagger.io/specification/#schema-object)
- [HAPI MCP source code](https://github.com/la-rebelion/hapi-mcp)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
