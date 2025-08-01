---
sidebar_label: Prerequisites
sidebar_class_name: blue
title: 'Prerequisites for a HAPI MCP'
description: 'Prepare your environment for Model Context Protocol (MCP) development: tools, dependencies, and best practices for API-first, OpenAPI-driven projects.'
keywords:
  - MCP
  - prerequisites
  - OpenAPI
  - API-first
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2025-07-27'
---

# Prerequisites for a HAPI MCP

:::tip[**TL;DR:**]
If you are anxious to get started, simply choose the *Cloud* option. You can start using the APIs right away (create an account is optional).
:::

Before starting with MCP and the HAPI Stack, decide your deployment mode:

### 1. Cloud Deployment

- **Ideal for:** Fast onboarding, zero infrastructure management.
- **How to start:**  
  - Server or Client-side integration with any MCP ecosystem.
    - [runMCP](https://run.mcp.com.ai) for server orchestration and management.
    - [chatMCP](https://chat.mcp.com.ai) to integrate agents and interact with APIs via chat interfaces.
  - No local setup required; services are provisioned and managed in the cloud.

### 2. On-Premise Deployment

- **Ideal for:** Full control, custom integrations, compliance requirements.
- **How to start:**  
  - Manually start HAPI Servers on your infrastructure with the `hapi` CLI tool.
  - Use provided bash scripts from [La Rebelion Labs](https://rebelion.la) to set up local DNS (using [Caddy Server](https://caddyserver.com) with an API wrapper for easy configuration, also provided by La Rebelion). [Request a demo](https://go.rebelion.la/demo-request) to get access to the scripts and tools.
  - Review infrastructure requirements and ensure your team can manage server operations.

:::info
Architects: Choose cloud for speed and simplicity, on-premise for control and customization.
:::

## Decision Points

- **Cloud:**  
  - No infrastructure required.
  - Managed updates and scaling.
  - Quick integration with the HAPI Stack services.
  - Immediate access to public APIs, no account required.

- **On-Premise:**  
  - Manual server management.
  - Custom DNS and networking setup.
  - Airgapped environments supported.
  - Ideal for teams with specific compliance or security needs.
  - Custom API specifications and integrations.
  - Greater flexibility for enterprise needs.

## Further Reading

- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/overview)
- [OpenAPI Specification](https://swagger.io/specification/)
- [runMCP](https://run.mcp.com.ai)
- [chatMCP](https://chat.mcp.com.ai)
