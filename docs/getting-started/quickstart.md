---
sidebar_position: 2
sidebar_label: Quickstart
sidebar_class_name: orange
---
import JSONLD from '@theme/JSONLD';

# Quickstart: MCP, OpenAPI, API-first

<JSONLD data={{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Quickstart: MCP, OpenAPI, API-first",
  "description": "Get started with Model Context Protocol (MCP) and OpenAPI: step-by-step guide to your first API-first, context-driven project.",
  "keywords": "MCP, quickstart, OpenAPI, API-first, setup, hello world, onboarding, developer experience",
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

:::tip
Start your API-first journey with MCP and OpenAPI in minutes.
:::

## 1. Install Prerequisites
- Node.js LTS (`nvm use lts/jod`)
- Bun (`bun install`)
- Git

## 2. Clone Example Project
```sh
git clone https://github.com/la-rebelion/chat-mcp.git
cd chat-mcp
bun install
```

## 3. Run the Example
```sh
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your MCP-powered app in action.

## 4. Explore the API
- Open the OpenAPI/Swagger UI (usually `/api/docs`)
- Try sending a request using Swagger or Postman

:::caution
If you see errors, check your Node.js and Bun versions and ensure all dependencies are installed.
:::

## Next Steps
- Edit the OpenAPI schema to add endpoints
- Explore context and memory features in MCP
- Try deploying to production (see Deployment Guide)

## Further Reading
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Bun](https://bun.sh/)
