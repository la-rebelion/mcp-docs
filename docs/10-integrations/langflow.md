---
title: LangFlow Integration
description: Guide on integrating LangFlow with APICove HAPI using the MCP protocol.
label: LangFlow
draft: true
---

# LangFlow Integration with APICove HAPI

This document provides a comprehensive guide on integrating LangFlow with APICove HAPI using the MCP (Model Context Protocol) protocol. LangFlow is a visual programming tool that allows users to create and manage workflows for language models. By integrating it with APICove HAPI, users can leverage OpenAPI specifications to create powerful tools and workflows.

## Prerequisites

- **HAPI Server**: Ensure you have APICove HAPI installed and running. Refer to the [HAPI documentation](/docs/components/hapi-server) for installation instructions.
- **LangFlow**: Install LangFlow by following the instructions on the [LangFlow GitHub repository](https://github.com/langflow/langflow).
- **OpenAPI Specification**: Have an OpenAPI specification file ready that defines the API endpoints you want to use with LangFlow.

## Steps to Integrate LangFlow with APICove HAPI

### 1. Start the HAPI Server

Ensure your HAPI server is running with MCP support enabled. You can start the server using the following command:

```bash
hapi start --mcp
```

### 2. Configure LangFlow

When starting LangFlow, you need to configure it to connect to your HAPI server. You can do this by setting the `HAPI_URL` environment variable to point to your HAPI server's MCP endpoint.

For example, if your HAPI server is running locally on port 3000, you can start LangFlow with the following command:

```bash
HAPI_URL=http://localhost:3000/mcp langflow
```

```bash
docker run -p 7860:7860 --add-host host.docker.internal:host-gateway --name langflow -d langflowai/langflow:1.5.1
docker exec -it langflow /bin/bash
export HAPI_URL=http://host.docker.internal:3000/mcp
langflow
```

### 3. Import OpenAPI Specification
```bash
curl -X POST http://localhost:7860/api/openapi/import -H "Content-Type: application/json" -d '{
  "url": "http://localhost:3000/openapi.json"
}'
```


## References

- [LangFlow Documentation](https://docs.langflow.com/)
- [Install and run Langflow with Docker](https://docs.langflow.org/get-started-installation#install-and-run-langflow-docker)
- [LangFlow MCP Client Documentation](https://docs.langflow.org/mcp-client#)
- [APICove HAPI Documentation](/docs/components/hapi-server)