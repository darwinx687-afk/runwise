# Ecosystem Detection Sample

This is a curated sample, not a generated `.runwise/` artifact.

## Detected Profiles

| Profile | Confidence | Local signals |
| --- | --- | --- |
| MCP | confirmed | `mcp.json`, MCP tool docs |
| Codex | confirmed | `AGENTS.md`, project instructions |
| OpenAI-compatible API | likely | `OPENAI_BASE_URL` placeholder |
| China-ready LLM | likely | DashScope/Qwen, DeepSeek, Moonshot/Kimi placeholders |

## Recommendations

1. Document provider base URLs and model names.
2. Note data boundaries for each provider.
3. Add fallback behavior for provider outages or rate limits.
4. Keep ecosystem-specific examples close to the real project shape.

## If Detection Is Missing

- Add a small README note that explains the stack.
- Add safe `.env.example` placeholders instead of real secrets.
- Keep config files in predictable locations.
- Add trace fixtures that show the stack in use.

## Why This Matters

Ecosystem detection helps reviewers understand what kind of AI project they are looking at before they inspect every file.
