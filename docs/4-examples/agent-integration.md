---
sidebar_position: 3
sidebar_label: Agent Integration
sidebar_class_name: green
title: 'Agent Integration: MCP, OpenAPI, API-first'
description: 'How to integrate agents with MCP using OpenAPI and API-first principles. Includes code, hooks, and best practices.'
keywords:
  - MCP
  - agent integration
  - OpenAPI
  - API-first
  - example
  - agent
  - orchestration
  - developer experience
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2025-07-27'
draft: true
---

# Agent Integration: MCP, OpenAPI, API-first

This example shows how to connect an agent (e.g., chatbot, automation) to an MCP API using OpenAPI.

## 1. OpenAPI Schema for Agent
```yaml
openapi: 3.1.0
info:
  title: Agent Integration API
  version: 1.0.0
paths:
  /agent/act:
    post:
      summary: Agent action
      operationId: agentAct
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                action:
                  type: string
      responses:
        '200':
          description: Action result
          content:
            application/json:
              schema:
                type: object
                properties:
                  result:
                    type: string
```

## 2. Agent Code Example (Node.js)
```js
const fetch = require('node-fetch');
async function act(action) {
  const res = await fetch('http://localhost:3000/agent/act', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action })
  });
  const data = await res.json();
  console.log('Agent result:', data.result);
}
act('greet');
```

## 3. API Handler Example
```js
app.post('/agent/act', (req, res) => {
  const { action } = req.body;
  // Implement custom logic or call plugins
  res.json({ result: `Action ${action} performed!` });
});
```

:::tip
Use OpenAPI to describe agent actions and expected results. This enables auto-generation of SDKs and validation.
:::

## Further Reading
- [OpenAPI Specification](https://swagger.io/specification/)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
