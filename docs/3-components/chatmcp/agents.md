---
sidebar_position: 2
sidebar_label: Agents
sidebar_class_name: purple
title: 'Agents in the HAPI Stack'
description: 'Learn how agents operate in the HAPI Stack, orchestrating context-driven conversational flows using ChatMCP, OpenAPI, and MCP.'
keywords:
  - HAPI
  - ChatMCP
  - agent architecture
  - conversational AI
  - OpenAPI
  - Model Context Protocol
  - MCP
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2025-07-27'
---

import InlineSVG from '@site/src/components/SyncImage';

# Agents in the HAPI Stack

Agents are the reasoning engines at the heart of the HAPI Stack, orchestrating context-driven conversational flows. They coordinate user input, context management, tool invocation, and memory, leveraging the Model Context Protocol (MCP) and API contracts for robust, API-first interactions.

<InlineSVG name="agent-architecture-diagram"
    alt="HAPI Agent Architecture Diagram"
    width="100%"
    className="center-image"
/>

## Agent Architecture Overview

The [architecture diagram](/img/diagrams/agent-architecture-diagram.svg) illustrates the modular design of agents in the HAPI Stack:

- **Agent Core:** Central reasoning engine that coordinates all modules and manages the flow of information.
- **Input Processing:** Handles user prompts, natural language processing (NLP), intent extraction, and context parsing.
- **Knowledge Retrieval:** Uses RAG (Retrieval-Augmented Generation), LLM knowledge bases, and internet sources to fetch relevant information.
- **Actions & Tools:** Executes structured actions via OpenAPI tools, functions, APIs, and planning modules.
- **Memory:** Manages short-term (chat history) and long-term (database, cache) memory for continuity and personalization.
- **Output Generation:** Produces, refines, and formats responses, including media generation.
- **User Interface:** Connects agents to chat, web, mobile, and API endpoints for seamless user interaction.

## How Agents Orchestrate Chat Flows

Agents in the HAPI Stack implement **Context Engineering** (see [ChatMCP Context Engineering](./index.md)) to ensure every chat flow is:

- **Context-Driven:** Each message is processed with full awareness of session and context, as defined by MCP.
- **API-First:** All actions and tool calls are validated against OpenAPI contracts.
- **Composable:** Agents support direct, group, and mediated conversations.
- **Memory-Driven:** Persistent and ephemeral memory enables continuity and personalization.

### Flow Example

1. **User Input:** The agent receives a message, which is added to the chat history.
2. **Prompt Construction:** The agent builds a prompt from recent messages and context.
3. **Reasoning:** The agent processes the prompt, may invoke RAG or tools.
4. **Tool Invocation:** Structured actions are performed via OpenAPI tools (e.g., fetch weather).
5. **Answer Generation:** The agent generates a response, which is returned to the user and stored in memory.

```ts
// @example Agent flow pseudocode
addMessage(chat.id, { content: 'Hello!', senderId: 'user' });
const prompt = buildPrompt(chat.history);
const answer = agent.processPrompt(prompt);
const toolResult = agent.invokeTool('getWeather', { location: 'Berlin' });
addMessage(chat.id, { content: answer, senderId: 'agent' });
```

## Integration with MCP and OpenAPI

- **MCP (Model Context Protocol):** Defines context schema, memory management, and agent orchestration.
- **OpenAPI:** Specifies all agent actions and tool invocations, ensuring contract-driven flows.

Agents validate all tool inputs/outputs against OpenAPI schemas, preventing runtime errors and enabling dynamic, context-aware interactions.

## Best Practices

- **Design agent actions with OpenAPI first.**
- **Persist context for smarter, personalized flows.**
- **Leverage memory modules for continuity.**
- **Test agent flows with real users and scenarios.**

## Further Reading

- [ChatMCP: Conversational AI](./index.md)
- [Chat Flow Design](./chat-flow-design.md)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Model Context Protocol (MCP)](https://github.com/la-rebelion)
