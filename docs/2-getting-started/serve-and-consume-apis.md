---
sidebar_position: 3
sidebar_label: Serve & Consume APIs
sidebar_class_name: green
title: 'Serve and Consume APIs with the HAPI Stack for MCP'
description: 'Step-by-step guide to serving and consuming APIs using HAPI Stack, following the Model Context Protocol (MCP) flow for API-first development.'
keywords:
  - MCP
  - HAPI Stack
  - API
  - OpenAPI
  - API-first
  - workflow
  - serve
  - consume
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2025-07-27'
---

import InlineSVG from '@site/src/components/SyncImage';

# Serve and Consume APIs with the HAPI Stack for MCP

<InlineSVG name="runMCP-flow" 
  alt="Serve and consume APIs with runMCP"
  width="80%"
  className="center-image"
/>

This guide walks you through the typical flow of [serving](https://run.mcp.com.ai) and [consuming](https://chat.mcp.com.ai) APIs using the HAPI Stack for MCP. It covers the steps from defining your API contract to consuming it in a MCP client compliant application, all while adhering to API-first principles and the Model Context Protocol (MCP).

---

## Step 1: Define Your API (OpenAPI Spec)

- Start by designing your API contract using OpenAPI (YAML or JSON).
- Use tools like Swagger Editor or VSCode plugins for authoring.
- Example:
  ```yaml
  openapi: 3.1.0
  info:
    title: Example API
    version: 1.0.0
  paths:
    /hello:
      get:
        summary: Greet the world
        responses:
          '200':
            description: Success
  ```

## Step 2: Register API with runMCP

- Upload or link your OpenAPI spec in the [runMCP dashboard](https://run.mcp.com.ai).
- runMCP validates and registers your API, generating interactive API testing UI and [MCP endpoint](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports#streamable-http).

## Step 3: Serve the API

- Deploy your API implementation (Node.js, Python, etc.) using the registered contract.
- Use runMCP’s built-in server or connect your own backend.
- runMCP provides:
  - Live API docs at `/api/docs`
  - Mock server for rapid prototyping
  - API gateway features (rate limiting, auth, etc.)

## Step 4: Consume the API

- Discover available APIs via runMCP’s catalog.
- Use generated client SDKs or copy OpenAPI endpoints for integration.
- Test endpoints interactively in the dashboard or with tools like Postman.

## Step 5: Monitor & Iterate

- Monitor usage, logs, and health via runMCP.
- Update your OpenAPI spec as requirements evolve.
- Redeploy and re-register changes to keep consumers in sync.

---

## Typical Workflow Overview

1. **Design** → 2. **Register** → 3. **Serve** → 4. **Consume** → 5. **Monitor & Iterate** ♻️

The above flow ensures a contract-driven, API-first development process, reducing integration friction and enabling rapid iteration.

---

## Further Reading

- [runMCP Documentation](/components/runmcp)
- [chatMCP Documentation](/components/chatmcp)
- [HAPI Stack Overview](/components/hapi-stack)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

