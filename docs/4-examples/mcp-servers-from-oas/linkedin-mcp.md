---
title: How to setup a LinkedIn MCP Server
---

# How to setup a LinkedIn MCP Server

If you want to integrate LinkedIn data into your application using the Model Context Protocol (MCP), you can set up a LinkedIn MCP Server by following these steps:

1. **Create a LinkedIn Developer Account**: If you haven't already, sign up for a LinkedIn Developer account and create a new application. This will give you access to the LinkedIn API and the necessary credentials (Client ID and Client Secret).

2. Download the LinkedIn OpenAPI specification file (usually in JSON or YAML format), LinkedIn doesn't provide an official OpenAPI spec, but you can create your own based on their API documentation. Ask your favorite LLM to generate it, or download from the HAPI MCP non-official OAS repository.

3. **Configure the MCP Server**: Open your OAS file and add `x-hapi` extensions as needed to support LinkedIn's API features.

  ```yaml
  x-hapi:
  security:
    - oauth2_authorization_code:
        client_id: "YOUR_CLIENT_ID"           # Replace with your LinkedIn app's Client ID
        client_secret: "YOUR_CLIENT_SECRET"   # Replace with your LinkedIn app's Client Secret
  ```

4. **Install HAPI MCP**: Make sure you have the HAPI MCP CLI installed. You can install it downloading from the HAPI MCP GitHub repository. Or running the install bash script provided in the repository.

  ```bash
  curl -o hapi-mcp.zip -L https://github.com/hapi-server/hapi-mcp/archive/refs/heads/main.zip
  unzip hapi-mcp.zip
  cd hapi-mcp-main
  ./install.sh
  ```

5. **Start the MCP Server**: Run the following command to start the MCP Server:
   ```
   hapi serve linkedin --headless
   ```

6. **Test the MCP Server**: Use tools like Postman or Insomnia to test the API endpoints and ensure they are working as expected.

By following these steps, you can successfully set up a LinkedIn MCP Server and integrate LinkedIn data into your application.
