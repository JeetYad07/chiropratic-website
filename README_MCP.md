# MCP Server Setup Guide for Web Development

This workspace now includes an [`mcp.json`](file:///Users/jeetyadav/Workspace/Dr_Hashi_website/mcp.json) configuration file featuring essential MCP servers for web design, browser testing, database management, and deployment.

---

## 🛠 Included MCP Servers

| Server | Package / Command | Primary Use Case |
| :--- | :--- | :--- |
| **Puppeteer** | `@modelcontextprotocol/server-puppeteer` | Headless browser testing, screenshot captures, DOM layout analysis |
| **Fetch** | `@modelcontextprotocol/server-fetch` | Fetching live web documentation & API specs |
| **Filesystem** | `@modelcontextprotocol/server-filesystem` | Project-scoped local asset and source code access |
| **Supabase** | `@supabase/mcp-server-supabase` | Database schema management, auth, migrations, RLS rules |
| **PostgreSQL** | `@modelcontextprotocol/server-postgres` | Direct PostgreSQL database querying & table inspection |
| **GitHub** | `@modelcontextprotocol/server-github` | PRs, issues, commits, and CI/CD workflow management |
| **Brave Search** | `@modelcontextprotocol/server-brave-search` | Web search for up-to-date web development APIs |

---

## 🔑 Required Environment Variables

Before using servers that require credentials, update [`mcp.json`](file:///Users/jeetyadav/Workspace/Dr_Hashi_website/mcp.json) with your actual API keys / tokens:

1. **Supabase**:
   - `SUPABASE_URL`: Your Supabase Project URL (e.g., `https://xyzcompany.supabase.co`)
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase secret service key.

2. **PostgreSQL**:
   - Update the connection string: `postgresql://user:password@localhost:5432/dbname`

3. **GitHub**:
   - `GITHUB_PERSONAL_ACCESS_TOKEN`: Personal Access Token with repo scope.

4. **Brave Search**:
   - `BRAVE_API_KEY`: API key from [Brave Search API](https://brave.com/search/api/).

---

## 🚀 How to Load into Your AI Client

* **Claude Desktop**: Copy the contents of `mcp.json` into `~/Library/Application Support/Claude/claude_desktop_config.json`.
* **Cursor / VS Code**: Add `mcp.json` location in your client's MCP configuration settings.
* **Antigravity / Gemini CLI**: Place `mcp.json` in root workspace (already done) or point your client settings to [`mcp.json`](file:///Users/jeetyadav/Workspace/Dr_Hashi_website/mcp.json).
