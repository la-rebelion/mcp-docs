---
sidebar_position: 2
sidebar_label: Fullstack Example
sidebar_class_name: orange
title: 'Fullstack Example: MCP, OpenAPI, API-first'
description: 'A fullstack example using MCP, OpenAPI, and API-first design. Shows both backend (Node.js/Express) and frontend (React) integration.'
keywords:
  - MCP
  - fullstack
  - OpenAPI
  - API-first
  - example
  - frontend
  - backend
  - React
  - Express
author: 'La Rebelion'
publisher: 'MCP Project'
dateModified: '2025-07-27'
draft: true
---

# Fullstack Example: MCP, OpenAPI, API-first

This example demonstrates a simple fullstack MCP app:
- **Backend:** Node.js/Express with OpenAPI contract
- **Frontend:** React app calling the backend API

## 1. Backend OpenAPI Schema
```yaml
openapi: 3.1.0
info:
  title: Fullstack Example API
  version: 1.0.0
paths:
  /greet:
    get:
      summary: Get greeting
      operationId: getGreeting
      parameters:
        - name: name
          in: query
          schema:
            type: string
      responses:
        '200':
          description: Greeting
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
```

## 2. Backend Implementation (Express)
```js
const express = require('express');
const app = express();
app.get('/greet', (req, res) => {
  const name = req.query.name || 'World';
  res.json({ message: `Hello, ${name}!` });
});
app.listen(3001, () => console.log('API running on port 3001'));
```

## 3. Frontend Example (React)
```jsx
import React, { useState } from 'react';
export default function Greet() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const greet = async () => {
    const res = await fetch(`/greet?name=${name}`);
    const data = await res.json();
    setMessage(data.message);
  };
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
      <button onClick={greet}>Greet</button>
      <div>{message}</div>
    </div>
  );
}
```

:::tip
You can extend this example with authentication, context, or more endpoints as your app grows.
:::

## Further Reading
- [OpenAPI Specification](https://swagger.io/specification/)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
