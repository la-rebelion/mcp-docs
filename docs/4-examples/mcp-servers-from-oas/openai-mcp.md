---
title: "OpenAI MCP Server"
description: "Learn how to set up a Model Context Protocol (MCP) server that wraps the OpenAI API using the HAPI CLI."
keywords:
  - OpenAI MCP Server
  - HAPI MCP
  - Model Context Protocol
  - API Integration
authors:
  - adrian
---

The OpenAI API can be easily wrapped into a Model Context Protocol (MCP) server using the [HAPI CLI](http://localhost:3000/components/hapi-server/hapi-cli). This allows you to leverage OpenAI's powerful language models through a standardized API interface. But, **the OpenAI API is huge**, and is not a good idea to wrap all of it into a single MCP server, because the [token bloat in MCP](https://mcp.com.ai/mcp-at-scale/how-to-scale-mcp-to-thousands-of-tools-without-distroying-budget) tool contexts would be unmanageable. Instead, you can create focused MCP servers that expose only the endpoints and functionalities you need for your application. Here, we are going to **create a minimal MCP server** that exposes only the `image` and `audio` generation endpoints from the OpenAI API.

> Of course, if you are using Claude, you can leverage the [Tool Search Tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool), but not all MCP-Clients currently support full MCP discovery and lazy loading.

This minimal MCP Server wrapping the OpenAI API keeps the MCP tool context lean and efficient, allowing AI agents to discover and use the OpenAI capabilities without overwhelming token usage. This way, you can use any MCP-aware AI client to access OpenAI's features in a controlled and optimized manner.

If you are using Claude, you can leverage the [Claude Code Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) feature to create intelligent agents that can interact with your OpenAI MCP server. This allows you to build sophisticated AI applications that can reason about, when, and how to call the OpenAI API based on user input and context.

## Steps to Create an OpenAI MCP Server

1. **Install HAPI MCP**: Make sure you have the HAPI MCP CLI installed. You can install it downloading from the HAPI MCP GitHub repository. Or running the install bash script provided in the repository. Installation options in the [HAPI CLI documentation](/components/hapi-server/hapi-cli), or at [HAPI MCP CLI microsite](https://hapi.mcp.com.ai).


  ```bash
  curl -fsSL https://get.mcp.com.ai/hapi.sh | bash
  ```

2. **Start the MCP Server**: Run the following command to start the MCP Server:
   ```
   hapi serve openai --headless
   ```

3. **Test the MCP Server**: Use tools like [chatMCP](https://chat.mcp.com.ai), [LibreChat](https://www.librechat.ai), [VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers#_add-an-mcp-server), or any MCP-aware client to test the API endpoints and ensure they are working as expected.

### Docker Example

```sh
docker run --name hapi-openai -d \
  -p 3030:3030 \
  hapimcp/hapi-cli:0.6.0 serve \
  --openapi https://docs.mcp.com.ai/servers-apis/openapi/openai-tools.json \
  --headless \
  --url https://api.openai.com/v1
```

Find more ways to deploy HAPI MCP servers in the [HAPI MCP Deployment documentation](/deployment), including using [Docker](/deployment/docker), Cloudflare, and other cloud providers.
