---
sidebar_position: 1
sidebar_label: Quick Demo
sidebar_class_name: blue
title: 'Quick Demo: Greenfield MCP+OpenAPI'
description: 'A quick demonstration of MCP, OpenAPI, and API-first integration with code and deployment steps for greenfield scenarios'
keywords:
  - MCP
  - quick demo
  - OpenAPI
  - API-first
  - example
  - onboarding
  - developer experience
author: 'La Rebelion'
publisher: 'MCP Project'
dateModified: '2025-07-27'
---

This example shows how to:
- Define a simple OpenAPI schema
- Implement a minimal MCP-compliant API
- Run and test locally

## 1. Define OpenAPI Schema
```yaml
# ~/.hapi/specs/ping-pong.yaml
openapi: 3.1.0
info:
  title: Quick Demo API
  version: 1.0.0
paths:
  /ping:
    get:
      summary: Ping endpoint
      operationId: ping
      responses:
        '200':
          description: Pong
          content:
            application/json:
              schema:
                type: object
                properties:
                  pong:
                    type: boolean
```

## 2. Init and Start the MCP Server

```js
hapi init ping-pong
hapi serve ping-pong --port 443 --cert ./certs/cert.pem --key ./certs/key.pem
```

## 3. Test the API
```sh
curl https://localhost:3000/ping
# { "pong": true }
```

From here you can connect your prefer MCP client.

:::tip
You can extend this demo by adding context, authentication, or more endpoints following MCP and OpenAPI best practices.
:::

## Further Reading
- [OpenAPI Specification](https://swagger.io/specification/)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
