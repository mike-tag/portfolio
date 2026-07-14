# Project instructions

This project is a static, values-led advocacy workbench for Veterans for All Voters. Open primaries are the first issue playbook.

## Design work

- For any task that creates or materially changes a product or visual artifact, read and follow [DESIGN_DECISIONS.md](./DESIGN_DECISIONS.md) before making design decisions.
- This includes React interfaces, HTML pages, websites, slide decks, documents with visual hierarchy, charts, diagrams, social graphics, and other public-facing visuals.
- Treat it as a standalone, project-agnostic resource for framing the audience and purpose, comparing meaningful alternatives, explaining consequential choices, handling feedback, and recording decisions proportionally.

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

## Review handoff

- After completing each major edit, start or reuse the local development server and include a clickable link to the exact local preview route in the final response so the user can review it in the Codex browser.
- When the edited experience has a direct hash route, link to that local route rather than only to the local homepage. For example, use a URL ending in `#/transformation` for Consulting Reformed and `#/workbench` for the Advocacy Workbench.
- Do not include the deployed GitHub Pages URL in routine edit-completion responses.
- Include the deployed site URL only in the output of a deployment or publishing workflow, after the deployment has completed successfully.
- If a local preview cannot be started or reached, say so clearly instead of substituting the deployed site link.
