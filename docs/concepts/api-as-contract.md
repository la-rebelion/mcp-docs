---
sidebar_position: 2
sidebar_label: API as Contract
sidebar_class_name: orange
---
import JSONLD from '@theme/JSONLD';

# API as Contract: MCP, OpenAPI, API-first

<JSONLD data={{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "API as Contract: MCP, OpenAPI, API-first",
  "description": "Understand how API-first and OpenAPI make APIs the contract in Model Context Protocol (MCP) systems, ensuring reliability and interoperability.",
  "keywords": "API as contract, OpenAPI, API-first, MCP, specification, interoperability, contract testing",
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

In API-first, MCP-powered systems, the API specification is the contract between all participants—clients, agents, servers, and tools.

## What Does "API as Contract" Mean?
- Your OpenAPI spec defines every endpoint, input, output, and error
- All code, documentation, and tests are generated from the spec
- Changes to the API are made by updating the contract first

:::tip
Contract-driven development reduces integration friction and enables safe, fast iteration across teams.
:::

## Example: Contract Testing
```yaml
openapi: 3.1.0
paths:
  /messages:
    post:
      summary: Send message
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Message'
      responses:
        '201':
          description: Message sent
```

## Best Practices
- Treat your OpenAPI spec as the single source of truth
- Automate contract testing and validation
- Communicate contract changes early and clearly

## Further Reading
- [OpenAPI Specification](https://swagger.io/specification/)
- [Contract Testing](https://martinfowler.com/bliki/ContractTest.html)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
