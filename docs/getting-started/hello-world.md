---
sidebar_position: 4
sidebar_label: Hello World
sidebar_class_name: blue
---
import JSONLD from '@theme/JSONLD';

# Hello World: MCP, OpenAPI, API-first

<JSONLD data={{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Hello World: MCP, OpenAPI, API-first",
  "description": "A simple Hello World example using Model Context Protocol (MCP), OpenAPI, and API-first principles.",
  "keywords": "hello world, MCP, OpenAPI, API-first, example, quickstart, onboarding",
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

Let's build a "Hello World" API using MCP and OpenAPI:

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
You can extend this example to include context, memory, or authentication using MCP features.
:::

## Further Reading
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
- [OpenAPI Specification](https://swagger.io/specification/)
