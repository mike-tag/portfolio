# Project instructions

This project is a static, values-led advocacy workbench for Veterans for All Voters. Open primaries are the first issue playbook.

## Product rules

- Build with React, Vite, and TypeScript.
- Keep the first version static. No backend, accounts, analytics, API calls, or API-key handling.
- The app generates structured work packets and prompts that users can copy into an AI tool.
- Design for public advocates and first-time users, not technical operators.
- Treat public officials and institutions as practical audience personas using public roles, statements, priorities, and actions.
- Keep known public facts distinct from strategic judgment about the audience.
- Lead with VAV values: service, voter voice, trust, authentic stories, common ground, accountability, and practical action.
- Use plain language and avoid insider jargon.

## Evidence rules

- Keep bibliographic sources and individual claims conceptually separate.
- Every factual claim needs a source locator, best use, caveat, reform type, and verification status.
- Preserve qualifications from the evidence review. Never flatten mixed evidence into a guaranteed benefit.
- Treat the local ChatGPT research syntheses as maps to underlying sources, not as final authorities.
- Label current or volatile figures for refresh before public use.
- Testimony examples demonstrate structure and tone; they are not factual sources.

## Engineering rules

- Keep components and data modules readable.
- Maintain keyboard access, visible focus, semantic labels, responsive layouts, and reduced-motion support.
- Keep GitHub Pages navigation hash-based or otherwise reload-safe.
- Before finishing a task, run `pnpm run build` and `pnpm test` and fix failures.
