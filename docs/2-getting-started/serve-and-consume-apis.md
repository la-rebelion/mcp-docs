---
sidebar_position: 3
sidebar_label: Serve & Consume APIs
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

This guide walks you through the typical flow of [serving](https://run.mcp.com.ai) and [consuming](https://chat.mcp.com.ai) APIs using the HAPI Stack for MCP. It covers the steps from defining your API contract to consuming it in a MCP client compliant application, all while adhering to API-first principles and the Model Context Protocol (MCP).

---

<InlineSVG name="runMCP-flow" 
  alt="Serve and consume APIs with runMCP"
  width="80%"
  className="center-image"
/>

## Typical Workflow Overview

1. **Design** → 2. **Register** → 3. **Serve** → 4. **Consume** → 5. **Monitor & Iterate** ♻️

The above flow ensures a contract-driven, API-first development process, reducing integration friction and enabling rapid iteration.

---

## Step 1: Define Your API (OpenAPI Spec)

- Start by designing your API contract using OpenAPI (YAML or JSON).
- Use tools like [Swagger Editor](https://editor.swagger.io/) or [VSCode extensions](https://marketplace.visualstudio.com/items?itemName=42Crunch.vscode-openapi) for authoring.
- Example:
```yaml
  openapi: 3.1.0
  info:
    title: Example API for MCP
    version: 1.0.0
  paths:
    /hello:
      get:
        summary: Greet the AI world
        responses:
          '200':
            description: Success
  ```

## Step 2: Register API with runMCP

- Upload or link your OpenAPI spec in the [runMCP dashboard](https://run.mcp.com.ai).
- runMCP validates and registers your API, generating interactive API testing UI and [MCP endpoint](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports#streamable-http).
- Forward the spec to the HAPI Control Plane for serving.

## Step 3: Serve the API

- The HAPI Control Plane handles serving your API based on the registered OpenAPI spec.
  - Instantiate the HAPI server with your OpenAPI spec.
  - Configure the routing engine registering subdomains to your API endpoints.
- The instance of HAPI Server will:
  - Serve your API endpoints dynamically based on the OpenAPI spec.
  - Generate endpoints dynamically based on your OpenAPI spec.
  - Validate incoming requests against the spec.
  - Secure access using [OpenAPI security schemes](https://swagger.io/specification/#security-scheme-object) (OAuth2, API keys, etc.).
- The HAPI Control Plane dynamically configures the Routing Engine to expose your API endpoints.

:::tip[Extensions 🧩]
[Extensions](https://swagger.io/specification/#specification-extensions) can be used to add custom metadata for [advanced HAPI-specific features](/advanced-guides/) or MCP context. Features like throttling, rate limiting, and caching can be configured as needed.
:::

## Step 4: Consume the API

- chatMCP can discover and consume the MCP Tools via runMCP’s catalog.
- Also, you can use any MCP client compliant application to consume the API.

## Step 5: Monitor & Iterate

- Monitor usage, logs, and health via runMCP, with all metrics and events tracked as code artifacts.
- Manage your OpenAPI spec and API configurations in version control (Git), enabling automated change tracking and auditability.
- Use GitOps workflows to update, version, and redeploy your API—every change is declarative and reproducible.
- Automatically trigger redeployment and re-registration of your API when changes are merged, keeping consumers in sync and ensuring continuous delivery.
- Integrate with CI/CD pipelines for automated testing, validation, and rollout of API updates.

---

## Further Reading

- [runMCP Documentation](/components/runmcp)
- [chatMCP Documentation](/components/chatmcp)
- [HAPI Stack Overview](/overview)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)
- [API-first Design Principles](https://www.postman.com/api-first/)
