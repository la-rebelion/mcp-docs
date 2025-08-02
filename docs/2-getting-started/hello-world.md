---
sidebar_position: 4
sidebar_label: Hello AI World (on-premise)
sidebar_class_name: blue
title: 'Hello World: MCP, OpenAPI, API-first'
description: 'A simple Hello World example using Model Context Protocol (MCP), OpenAPI, and API-first principles.'
keywords:
  - hello world
  - MCP
  - OpenAPI
  - API-first
  - example
  - quickstart
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2025-07-27'
---

# Hello AI World:  MCP and API-first approach

Let's build a simple "Hello World" API using MCP and OpenAPI. Something that can be used as a starting point for your own projects. This example will demonstrate how to define, implement, and consume an API using the Model Context Protocol (MCP) and OpenAPI.

## Choose Your Deployment

- **Cloud:**  
  - Use the webapp dashboard to create and test endpoints.
  - No code required—just configure and deploy via UI.

- **On-Premise:**  
  - Define your OpenAPI schema and implement endpoints manually.
  - Start HAPI Servers and configure DNS as needed.

## 1. Define the OpenAPI Schema

```yaml
openapi: 3.1.0
info:
  title: Hello World API
  version: 1.0.0
paths:
  /hello:
    get:
      summary: Returns Hello World
      operationId: getHello
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
```

## 2. Implement the Endpoint

```js
// Example using HAPI or Express
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});
```

## 3. Test the API

```sh
curl http://localhost:3000/hello
# { "message": "Hello, World!" }
```

:::tip
Cloud users: Use the built-in API explorer.  
On-premise users: Use Swagger UI or Postman.
:::

## Further Reading
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
- [OpenAPI Specification](https://swagger.io/specification/)
