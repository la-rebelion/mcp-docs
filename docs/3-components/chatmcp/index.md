---
sidebar_position: 1
sidebar_label: ChatMCP
sidebar_class_name: blue
title: 'ChatMCP: Conversational AI'
description: 'Overview of ChatMCP, its context management, and integration with HAPI and MCP using API-first and OpenAPI principles.'
keywords:
  - ChatMCP
  - conversational AI
  - OpenAPI
  - API-first
  - Model Context Protocol
  - MCP
author: 'La Rebelion Labs'
publisher: 'MCP Project'
dateModified: '2025-07-27'
---

import InlineSVG from '@site/src/components/SyncImage';

Overview of ChatMCP, its context management, and integration with HAPI and MCP using API-first principles.

Designing conversational flows in ChatMCP means orchestrating how users, agents, and context interact through structured APIs. By leveraging OpenAPI and the Model Context Protocol (MCP), you can create scalable, maintainable, and context-aware chat systems.

## Context Engineering in chatMCP

ChatMCP uses **Context Engineering** to orchestrate the flow of information between user input, prompt construction, agent reasoning, retrieval-augmented generation (RAG), tool invocation, and memory management.

<InlineSVG name="chatMCP-context-engineering" 
    alt="chatMCP Context Engineering Flow"
  width="80%"
  className="center-image"
/>

**Key Flow Steps:**
1. **User Input:** The user sends a message, which is added to the prompt and chat history.
2. **Prompt Construction:** The prompt is built from user input and short-term memory (chat history).
3. **Agent Reasoning:** The agent processes the prompt, coordinating with RAG and tools as needed.
4. **RAG Context:** The agent may query long-term memory (vector search) for relevant context.
5. **Action Tools:** The agent invokes tools (OpenAPI operations) for structured actions.
6. **Answer Generation:** The agent produces an answer, which is returned to the user and added to memory.
7. **Memory Management:** All context is stored in short-term (chat history) and optionally long-term memory (MCP servers/databases).

:::tip
Context Engineering ensures every chat flow is context-aware, API-first, and memory-driven.
:::
