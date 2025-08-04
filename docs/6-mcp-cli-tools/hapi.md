---
sidebar_position: 1
sidebar_label: HAPI CLI
sidebar_class_name: blue
title: 'HAPI CLI: MCP, OpenAPI, API-first'
description: 'CLI guide for HAPI server in the MCP stack.'
keywords:
  - HAPI CLI
  - HAPI server
  - OpenAPI
  - API-first
  - Model Context Protocol
  - MCP
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2025-07-27'
wip: true
---

# HAPI CLI: MCP, OpenAPI, API-first

CLI guide for HAPI server in the MCP stack.

## What is HAPI CLI?

HAPI CLI is a command-line interface tool designed to simplify the management and deployment of HAPI servers within the Model Context Protocol (MCP) ecosystem. It provides developers with a set of commands to easily create, configure, and run HAPI servers that adhere to OpenAPI specifications.

## Key Features
- **API-first design:** All commands are driven by OpenAPI specifications, ensuring consistency and contract-driven development.
- **Dynamic configuration:** Easily configure HAPI servers with minimal setup.
- **Multi-tenancy support:** Manage multiple HAPI server instances with isolated configurations.
- **Plugin extensibility:** Extend HAPI functionality with custom plugins for authentication, logging, and monitoring.
- **Zero-config onboarding:** Quickly onboard new services by registering OpenAPI specs without manual configuration.
- **Scalable architecture:** Supports horizontal scaling and high availability for production deployments.

## Installation
To install HAPI CLI, you can download the latest release from the [HAPI GitHub repository](https://github.com/la-rebelion/hapi-cli/releases).

Another option is to use the `install` script accessible via curl:

```bash
curl -sSL https://raw.githubusercontent.com/la-rebelion/hapi-cli/main/install.sh | bash
```

## Basic Usage
Once installed, you can use the `hapi` command to interact with HAPI servers.

### Starting a HAPI Server

Start a new HAPI server instance with an OpenAPI specification is as simple as:

```bash
# local file
hapi start petstore
# remote URL
hapi start https://petstore3.swagger.io/api/v3/openapi.json
```

**WIP:** This command is a work in progress and will be updated with more details soon.