---
sidebar_position: 1
sidebar_label: What is MCP?
sidebar_class_name: blue
title: 'What is MCP? API-first, OpenAPI, Model Context Protocol'
description: 'Learn what the Model Context Protocol (MCP) is, how it enables API-first development, and how it leverages OpenAPI for context-driven, scalable systems.'
keywords:
  - MCP
  - Model Context Protocol
  - OpenAPI
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2025-07-27'
---

# What is MCP? API-first, OpenAPI, Model Context Protocol

The **Model Context Protocol (MCP)** is a modern standard for building API-first, context-driven systems. MCP combines the power of OpenAPI with structured, portable context to enable scalable, interoperable, and developer-friendly applications.

## Key Principles
- **API-first:** Your OpenAPI schema is the contract—every tool, agent, and service follows it
- **Context-driven:** Context is a first-class citizen, enabling personalization, memory, and stateful workflows
- **Interoperability:** MCP makes it easy to integrate services, agents, and tools across languages and platforms

:::tip
MCP is designed for teams who want to move fast, avoid lock-in, and deliver great developer and user experiences.
:::

## How MCP Works
- Define your API and context structure in OpenAPI
- Use MCP-compliant servers (e.g., HAPI, RunMCP) to enforce contracts and manage context
- Connect agents, tools, and clients using the same protocol

## Example: MCP Context in OpenAPI
```yaml
components:
  schemas:
    Context:
      type: object
      properties:
        userId:
          type: string
        preferences:
          type: object
          properties:
            language:
              type: string
            theme:
              type: string
```

## Further Reading
- [OpenAPI Specification](https://swagger.io/specification/)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
