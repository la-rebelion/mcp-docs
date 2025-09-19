---

---

# QBot - CLI MCP Client

Natural‑language Terminal User Interface (TUI) to explore and use MCP tools from your CLI terminal. It features an interactive REPL (Read-Eval-Print Loop) prompt, command history, and LLM chat tool‑calling wired to your connected MCP server.

## Quick start

[Install](https://qbot.mcp.com.ai) or download from the [releases page](https://github.com/la-rebelion/qbot-cli/releases).

Connect to your MCP server:

`qbot --url http://localhost:3000/mcp`

Configure your LLM provider, model, and API key via commands (e.g. `/llm provider groq`, `/llm model llama-3.3-70b-versatile`, `/llm key groq <GROQ_API_KEY>`), or set them in `~/.qbot/config.json`.

## Features

- Interactive REPL (`qbot>` prompt), history.
- MCP over HTTP: list/call tools, list/read resources, list/get prompts. `stdio` and `sse` transports not supported.
- LLM chat via Abso with MCP tool‑calling (OpenAI‑tools compatible).
- Slash commands:
  - Core: `/help`, `/connect`, `/status`, `/tools`, `/call`, `/resources`, `/read`, `/prompts`, `/prompt`, `/history`, `/log`, `/run`, `/exit`
  - Logging: `/loglevel <debug|info|warn|error> [llm]` (sets global or LLM-only level)
  - LLM: `/llm status`, `/llm provider <openai|groq|openrouter|anthropic|ollama>`, `/llm model <modelId>`, `/llm key <provider> <apiKey>`, `/llm base <provider> <baseUrl>`
  - Session: `/reconnect` (confirm and auto-refresh), `/refresh` (reload tools/resources/prompts)
- Safe shell runs: never auto‑exec, confirm before running.
- Config at `~/.qbot/config.json` (MCP headers, LLM provider/model/keys).
  - Logging: `logging.level` controls global logs; `llm.logLevel` controls LLM pipeline logs. Levels: `debug`, `info`, `warn`, `error`.