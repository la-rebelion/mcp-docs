---
sidebar_position: 4
sidebar_label: Session vs Context
sidebar_class_name: blue
---
import JSONLD from '@theme/JSONLD';

# Session vs Context: MCP, OpenAPI, API-first

<JSONLD data={{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Session vs Context in MCP: API-first, OpenAPI",
  "description": "Understand the difference between session and context in Model Context Protocol (MCP) systems, and how OpenAPI enables context-driven, API-first workflows.",
  "keywords": "MCP, session, context, OpenAPI, API-first, state, stateless, conversational AI, memory",
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

A clear understanding of **session** and **context** is critical for designing robust, API-first systems with MCP and OpenAPI.

## What is a Session?
A **session** is a temporary, unique interaction between a user (or agent) and your system. It typically:
- Has a unique session ID
- Tracks authentication and authorization
- Stores ephemeral state (e.g., login, shopping cart)
- Is often short-lived (until logout or timeout)

## What is Context?
**Context** in MCP is a structured, persistent, and extensible data model that:
- Encapsulates user preferences, history, and long-term memory
- Is portable across sessions and devices
- Is defined and validated by your OpenAPI schema
- Enables smarter, more personalized interactions

:::tip
Use context to persist knowledge and preferences beyond a single session. This is key for conversational AI and multi-device experiences.
:::

## Example: Session vs Context
```js
// Session: ephemeral state
session = {
  id: 'abc123',
  userId: 'user42',
  expiresAt: '2025-08-01T12:00:00Z'
};

// Context: persistent, structured data
context = {
  userId: 'user42',
  preferences: { language: 'en', theme: 'dark' },
  lastInteraction: '2025-07-27T19:00:00Z',
  memory: [ ... ]
};
```

:::caution
Do not store sensitive or long-term data in sessions. Use context for persistent, cross-session state.
:::

## Best Practices
- Use sessions for authentication and short-lived state
- Use context for personalization, memory, and cross-session continuity
- Define context structure in your OpenAPI spec for validation and interoperability

## Further Reading
- [OpenAPI Specification](https://swagger.io/specification/)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
