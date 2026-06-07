# Rockwell Dev Test — Part 2

## The Stack

- **React 19** + **Vite 6** + **TypeScript**
- **Tailwind CSS** v3.4
- **shadcn/ui** (new-york style, slate base) — `Button` and `Card` already installed, add others as needed via `npx shadcn@latest add <component>`
- **Zustand** for state
- Path alias `@/*` → `src/*`

This stack matches what you'll work in day-to-day if you join the team.

## Setup

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). You should see a working demo card with a Zustand counter — that confirms the stack is wired up correctly.

## Your Task

1. **Delete the demo** (`src/App.tsx` contents) — it's there to prove the stack works, not as a reference design.
2. **[Open the Figma file](https://www.figma.com/design/0eYtG3wVxlLTaeVFI8GTrP/Rockwell-Dev-Test).** You'll see a single component spec — a data card list / filter panel. Implement it with 1:1 visual fidelity.
3. **Use Claude Code CLI (or Codex) with Figma MCP** to extract design tokens, spacing, colors, and assets. This is mandatory — we are evaluating your AI + MCP workflow, not just the finished component.
4. Add more shadcn components as needed (`npx shadcn@latest add <name>`).
5. Use Zustand for any component state that has real state (toggles, filters, selections). Use React local state for purely visual state (hover, focus).

## Deliverables

See the main test brief for full requirements. Short version:

1. **This repo, pushed to GitHub** — atomic commit history, clean messages. We read your commits.
2. **Screen recording (10–15 min, mandatory)** — most representative segment of your ~1.5 hr build. Narrate your prompts, how you use Figma MCP, how you verify AI output. Loom preferred, QuickTime acceptable. No editing beyond trimming.
3. **`RESPONSES.md`** (in this repo) — 150-word reflection on what worked, what didn't, what you'd do differently.

## What We're Scoring

| Dimension | What we look for |
|-----------|------------------|
| Prompting quality | Scoped, specific prompts — not shotgun "build it all" asks |
| Iteration speed | Figma → working component, how fast |
| MCP fluency | Reading MCP output and acting on it vs. staring at it |
| Verification discipline | Do you trust AI output blindly or check the diff? |
| Commit discipline | Atomic commits, meaningful messages |
| Design fidelity | Does the rendered component match the Figma? |

## Notes

- **Don't over-engineer.** Don't build a framework when a component will do.
- **Don't polish the recording.** We want to see how you actually work.
- **Don't hide your AI usage.** We want to see it.
