---
sidebar_position: 4
sidebar_label: Architecture
sidebar_class_name: blue
---

# HAPI MCP Architecture

## API-first, OpenAPI-powered Model Context Protocol

The **HAPI MCP Architecture** simplifies AI integration by leveraging existing APIs and OpenAPI specifications to create MCP tools. This [contract-first approach](https://rebelion.la/you-dont-need-to-implement-mcp-servers-a-contract-first-approach-to-ai-tool-integration?showSharer=true) eliminates the need for custom MCP server implementations, enabling seamless interaction between AI agents and backend systems.

![HAPI MCP Architecture Diagram](pathname:///img/diagrams/hapi-mcp-diagram.svg)

## Key Components

### 1. HAPI Server
- **Purpose**: Converts OpenAPI specs into MCP tools dynamically.
- **How it works**: Reads the OpenAPI file and generates MCP contracts, exposing API operations as tools.
- **Example**: A `GET /users` endpoint with `operationId: getUsers` becomes an MCP tool named `getUsers`.

### 2. runMCP
- **Purpose**: Acts as the control plane dashboard for managing multiple *Headless* API (HAPI) MCP servers.
- **How it works**: Comunicates with HAPI CP to manage the lifecycle of MCP servers and their tools. See this as the `kubectl` for MCP servers.
- **Example**: Aggregates tools from various HAPI Server instances and routes AI agent requests to the appropriate backend.

### 3. HAPI Control Plane (HAPI CP)
- **Purpose**: Provides the centralized management interface for the MCP servers.
- **How it works**: Communicates with *HAPI Server instances* to manage their lifecycle and tool availability. This also includes the ability to create the routing rules for incoming requests. See this as the `kube-apiserver` for MCP servers.
- **Example**: Allows you to add, remove, or update MCP servers and their tools dynamically.

### 4. chatMCP
- **Purpose**: Provides an interactive interface for AI agents to invoke MCP tools.
- **How it works**: Acts as the client layer, enabling users or AI agents to call tools via a unified interface.
- **Example**: An AI agent uses `chatMCP` to call the `getUsers` tool and retrieve user data.

## How It Works

1. **Generate MCP Tools**: HAPI Server reads your OpenAPI spec and generates MCP tools automatically.
2. **Manage MCP Servers**: runMCP orchestrates multiple HAPI Server instances, ensuring scalability and reliability.
3. **Invoke Tools**: AI agents use chatMCP to discover and call tools, which are routed through runMCP to the appropriate backend.

![runMCP Flow Diagram](pathname:///img/diagrams/runMCP-flow.svg)

## Benefits of the Architecture

- **No Custom MCP Servers**: Existing APIs become MCP-ready by exposing their OpenAPI specs.
- **Scalability**: Easily manage multiple MCP servers with runMCP.
- **Simplicity**: Focus on publishing contracts, not writing new server logic.
- **Interoperability**: MCP tools integrate seamlessly with AI agents, enabling dynamic workflows.

## Example Workflow

1. **Input**: A user provides an OpenAPI spec to HAPI Server.
2. **Tool Generation**: HAPI Server converts API operations into MCP tools.
3. **Orchestration**: runMCP manages the tools and routes requests.
4. **Invocation**: An AI agent uses chatMCP to call tools and retrieve results.

This architecture ensures that your existing APIs are AI-ready without additional development overhead. By focusing on contracts, the HAPI MCP stack enables faster integration, better scalability, and a seamless user experience.


