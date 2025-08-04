---
sidebar_position: 3
sidebar_label: Intent Routing
sidebar_class_name: green
---
import JSONLD from '@theme/JSONLD';

# Intent Routing: MCP, OpenAPI, API-first

<JSONLD data={{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Intent Routing: MCP, OpenAPI, API-first",
  "description": "Learn how intent routing works in Model Context Protocol (MCP) and OpenAPI-powered systems for smart, context-aware workflows.",
  "keywords": "intent routing, MCP, OpenAPI, API-first, conversational AI, workflow, orchestration, context",
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

Intent routing is the process of mapping user or agent intents to the correct API operation or workflow, using context and OpenAPI definitions.

## How Intent Routing Works
- Parse the user's intent (e.g., "book a flight")
- Match intent to an operationId in your OpenAPI spec
- Use context to fill in parameters and personalize the response

:::tip
Define clear operationIds and use OpenAPI tags to organize intents and workflows.
:::

## Example: Intent to Operation Mapping
```yaml
openapi: 3.1.0
paths:
  /flights/book:
    post:
      operationId: bookFlight
      summary: Book a flight
```

## Best Practices
- Use descriptive operationIds for each intent
- Validate intent-to-operation mapping with tests
- Use context to disambiguate and personalize routing

## Further Reading
- [OpenAPI Specification](https://swagger.io/specification/)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
