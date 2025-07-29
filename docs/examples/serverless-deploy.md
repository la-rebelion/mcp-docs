---
sidebar_position: 4
sidebar_label: Serverless Deploy
sidebar_class_name: blue
---
import JSONLD from '@theme/JSONLD';

# Serverless Deploy: MCP, OpenAPI, API-first

<JSONLD data={{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Serverless Deploy: MCP, OpenAPI, API-first",
  "description": "How to deploy MCP and OpenAPI-powered services serverlessly using AWS Lambda and API Gateway. Includes YAML, code, and best practices.",
  "keywords": "MCP, serverless, OpenAPI, API-first, example, AWS Lambda, API Gateway, deployment, developer experience",
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

This example shows how to deploy an MCP+OpenAPI service as a serverless function.

## 1. OpenAPI Schema for Serverless
```yaml
openapi: 3.1.0
info:
  title: Serverless Example API
  version: 1.0.0
paths:
  /hello:
    get:
      summary: Hello endpoint
      operationId: hello
      responses:
        '200':
          description: Hello response
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
```

## 2. Lambda Function Example (Node.js)
```js
exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from serverless MCP!' })
  };
};
```

## 3. AWS SAM/Serverless Framework YAML
```yaml
Resources:
  HelloFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Runtime: nodejs18.x
      Events:
        Hello:
          Type: Api
          Properties:
            Path: /hello
            Method: get
```

## 4. Deploy Steps
- Package and deploy using AWS SAM CLI or Serverless Framework
- Test endpoint via API Gateway

:::tip
You can use similar patterns for deploying to Azure Functions, Google Cloud Functions, or Vercel/Netlify.
:::

## Further Reading
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
