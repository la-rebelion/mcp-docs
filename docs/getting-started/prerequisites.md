---
sidebar_position: 1
sidebar_label: Prerequisites
sidebar_class_name: blue
---
import JSONLD from '@theme/JSONLD';

# Prerequisites for MCP: API-first and OpenAPI

<JSONLD data={{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Prerequisites for MCP: API-first and OpenAPI",
  "description": "Prepare your environment for Model Context Protocol (MCP) development: tools, dependencies, and best practices for API-first, OpenAPI-driven projects.",
  "keywords": "MCP, prerequisites, OpenAPI, API-first, environment, tools, setup, Node.js, Bun, Docusaurus",
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

To get started with MCP, ensure you have the following prerequisites:

## Environment
- **Node.js LTS** (recommended: use `nvm use lts/jod`)
- **Bun** (for fast JS/TS runtime and package management)
- **Git** (for version control)
- **Docusaurus** (for docs)

## Tools
- [OpenAPI Generator](https://openapi-generator.tech/) or [Swagger Editor](https://editor.swagger.io/)
- Code editor (VSCode recommended)
- Docker/Kubernetes (for deployment, optional)

:::tip
Use `nvm` and `bun` for reliable, reproducible dev environments across teams.
:::

## Project Setup
- Clone the MCP codebases (e.g., `chat-mcp`, `hapi-mcp`, `run-mcp`)
- Install dependencies with `bun install`
- Review the README and docs for each project

:::caution
Ensure your Node.js and Bun versions match those specified in the project docs for best compatibility.
:::

## Further Reading
- [Node.js](https://nodejs.org/)
- [Bun](https://bun.sh/)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Docusaurus](https://docusaurus.io/)
