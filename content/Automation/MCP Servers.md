## MCP Servers — Giving Your AI Superpowers

Here's something that will blow your mind: your AI coding tool can connect to external services and tools directly. These connections are called **MCP servers** (Model Context Protocol).

Think of it this way: without MCP, your AI can write code and run terminal commands. With MCP, your AI can also control a web browser, read databases, interact with APIs, and more — all directly, without you writing the integration code first.

**The one that matters most for us: Playwright MCP Server**

The Playwright MCP server lets your AI control a browser directly. This is incredibly useful for:

- Testing your upload automation (your AI can see what the browser sees)
- Debugging selector issues (your AI can inspect the page)
- Building your page map (your AI can find all the buttons and form fields)

**How to set it up:**

Tell your AI: "Help me install and configure the Playwright MCP server so you can control a Chrome browser directly."

The setup varies by AI tool:

- **Claude Code:** Add it to your configuration file
- **Cursor/Windsurf:** Add it through the MCP settings panel
- **VS Code + Copilot:** Install the MCP extension
    

Your AI will know the exact steps for your specific tool.

**Other useful MCP servers:**

- **Filesystem MCP** — Lets your AI read and write files more efficiently
- **Database MCP** — Direct SQLite access for your queue management
- **Screenshot MCP** — Capture what's on screen for debugging
    

You don't need all of these right away. Start with Playwright MCP and add others as you need them.

**The big picture:** MCP servers turn your AI from a code writer into a code _operator_. It can not only build your automation system — it can help you test and debug it by actually seeing and interacting with the same things your automation does.