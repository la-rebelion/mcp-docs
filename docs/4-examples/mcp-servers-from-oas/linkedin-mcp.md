---
title: "LinkedIn MCP Server: Integration Guide"
description: "Learn how to integrate LinkedIn data into your AI agents using HAPI MCP. Follow our step-by-step guide to set up a Model Context Protocol server for LinkedIn."
keywords:
  - LinkedIn MCP Server
  - HAPI MCP
  - OpenAPI
  - API Integration
  - MCP Tools
authors:
  - adrian
---

Integrating LinkedIn data into your application using the Model Context Protocol (MCP) allows your AI agents to interact with professional network data seamlessly. By using **HAPI MCP**, you can wrap LinkedIn's API into a standardized interface.

Follow these steps to set up your LinkedIn MCP Server:

## Prerequisites

1.  **LinkedIn Developer Account**: Sign up at the [LinkedIn Developer Portal](https://developer.linkedin.com/) and create a new application.
2.  **API Credentials**: Obtain your **Client ID** and **Client Secret** from the application dashboard.
3.  **OpenAPI Specification**: You will need an OAS file for LinkedIn. Since LinkedIn does not provide an official one, you can:
    *   Generate one using an LLM based on official docs.
    *   Download one from the [HAPI MCP Community Repository](https://github.com/hapimcp/openapi-specs).

---

## Setup Steps

### 1. Configure the MCP Server

Create or edit your LinkedIn OpenAPI (`.json` or `.yaml`) file. Add the `x-hapi` extension to handle LinkedIn's OAuth2 authentication:

```bash
curl -o linkedin.yaml https://docs.mcp.com.ai/apis/openapi/linkedin.yaml
```

```yaml
x-hapi:
  security:
    - oauth2_authorization_code:
        client_id: "YOUR_CLIENT_ID"           # Replace with your LinkedIn app's Client ID
        client_secret: "YOUR_CLIENT_SECRET"   # Replace with your LinkedIn app's Client Secret
```

### 2. Install HAPI MCP

If you haven't already, install the HAPI MCP CLI:

```bash
curl -fsSL https://get.mcp.com.ai/hapi.sh | bash
```

For more options, see the [HAPI CLI documentation](/components/hapi-server/hapi-cli).

### 3. Start the MCP Server

Launch your server by pointing to your LinkedIn configuration:

```bash
hapi serve linkedin --headless --port 3030 --url https://api.linkedin.com
```

### 4. Test the Integration

Use an MCP-aware client or testing tool to verify the endpoints:

*   **[chatMCP](https://chat.mcp.com.ai)**: Ideal for verifying tool execution.
*   **[VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers#_add-an-mcp-server)**: Add the server to your GitHub Copilot configuration.

Using the MCP Inspector:

```bash
hapi serve linkedin --headless --port 3030 --url https://api.linkedin.com | bunx @modelcontextprotocol/inspector
```

---

## Conclusion

By following these steps, you have successfully exposed LinkedIn as an MCP server. Your AI agents can now leverage professional insights and data through the standardized Model Context Protocol.
