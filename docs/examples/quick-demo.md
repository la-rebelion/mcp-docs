---
sidebar_position: 1
sidebar_label: Quick Demo
sidebar_class_name: blue
---
import JSONLD from '@theme/JSONLD';

# Quick Demo: MCP, OpenAPI, API-first

<JSONLD data={{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Quick Demo: MCP, OpenAPI, API-first",
  "description": "A quick demonstration of MCP, OpenAPI, and API-first integration with code and deployment steps.",
  "keywords": "MCP, quick demo, OpenAPI, API-first, example, onboarding, developer experience",
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

This example shows how to:
- Define a simple OpenAPI schema
- Implement a minimal MCP-compliant API
- Run and test locally

## 1. Define OpenAPI Schema
```yaml
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

## 2. Implement the Endpoint
```js
// Minimal Express example
const express = require('express');
const app = express();
app.get('/ping', (req, res) => {
  res.json({ pong: true });
});
app.listen(3000, () => console.log('Quick Demo API running on port 3000'));
```

## 3. Test the API
```sh
curl http://localhost:3000/ping
# { "pong": true }
```

:::tip
You can extend this demo by adding context, authentication, or more endpoints following MCP and OpenAPI best practices.
:::

## Further Reading
- [OpenAPI Specification](https://swagger.io/specification/)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
