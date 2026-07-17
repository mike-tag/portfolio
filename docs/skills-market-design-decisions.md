# Skills market design decisions

## Decision: Demonstrate the method before distributing the file

- Status: accepted
- Artifact or area: Portfolio skills market (`#/skills`)
- Date: 2026-07-16
- Audience and need: Hiring managers, collaborators, and agent users need to understand Mike's point of view and decide whether a published skill is useful before leaving for GitHub.
- Project goal: Make each skill both a portfolio artifact and a reusable tool.
- Evidence or known facts: The first public repository contains the Design Planning plugin and `plan-design-decisions` skill, with documented Codex and Claude Code installation paths.
- Assumptions: Most visitors will not know what an agent skill is and will evaluate the workflow through a concrete example faster than through its file structure.
- Constraints: Static React/Vite/TypeScript; no model calls or backend; GitHub Pages-safe routing; keyboard access, responsive behavior, visible focus, and reduced-motion support.
- Options considered: A repository-card catalog; an interactive skill case study with problem, solution, simulation, and installation.
- Decision and rationale: Use a repeatable case-study structure. The problem and solution establish the point of view, a four-step static simulation makes the behavior concrete, and verified installation commands plus the repository link let visitors use the skill. The market is data-backed so later skills can reuse the pattern.
- Tradeoffs or risks: A representative simulation cannot prove live model behavior. The interface labels it as static and sends visitors to the source repository for inspection.
- Verification: Confirm keyboard operation, narrow-screen layout, copy actions, exact GitHub link, build, tests, and the local `#/skills` route.
- Follow-up owner or trigger: Add a new record and listing when the next public skill is released; revisit filtering only when the catalog becomes difficult to scan.

## Decision: Give the simulated skill a visible speaker

- Status: accepted
- Artifact or area: Design Planning simulation
- Date: 2026-07-16
- Audience and need: First-time visitors need to distinguish what the user supplies, what the skill does, and the question the skill asks at each stage.
- Decision and rationale: Use Scout, a border collie with a compass tag, as the consistent speaker for Design Planning. Border collies signal attentive, purposeful guidance; the compass connects the character to decision-making without adding interface jargon. Every response is phrased as a representative question and labeled “Design Planning asks.”
- Tradeoffs or risks: A character can make a professional workflow feel decorative. Scout is confined to the question component, uses the established palette, and remains secondary to the question text.
- Verification: Confirm the speaker remains legible at desktop and mobile sizes, each stage presents a question, and the image has meaningful alternative text.

## Decision: End the simulation with the deliverable

- Status: accepted
- Artifact or area: Design Planning simulation, step 05
- Date: 2026-07-16
- Audience and need: Visitors need to see what the skill gives them, not only how it conducts the interview.
- Decision and rationale: Steps 01–04 show Scout asking questions; step 05 changes to a light document-style output card listing the plan's sections. The visual change marks the transition from conversation to artifact.
- Tradeoffs or risks: The simulated document is representative rather than a complete plan. It lists the real plan structure and keeps the static-walkthrough qualification nearby.
- Verification: Confirm step 05 is labeled Output, the document sections are readable, and the review–refine–builder-agent handoff appears inside the output card.

## Decision: Make recommendation quality visible in the simulation

- Status: accepted
- Artifact or area: Design Planning simulation, steps 01-04
- Date: 2026-07-17
- Audience and need: Visitors evaluating the skill need to see how it reaches a recommendation, not merely that it asks questions or produces a polished plan.
- Evidence or known facts: The revised Design Planning skill requires numbered user-facing questions, visibly labeled recommendations, an immediate rationale grounded in the brief, and a concise tradeoff for every option.
- Options considered: Summarize the revised behavior in the solution copy; demonstrate the full question, recommendation, rationale, and tradeoff pattern inside each simulation stage.
- Decision and rationale: Preserve the five-stage walkthrough and make steps 01-04 representative choice prompts spoken by Scout. Each stage asks one numbered question, leads with a recommended option, explains why it fits the known brief, and keeps credible alternatives and tradeoffs visible. This lets visitors inspect the skill's judgment before installing it.
- Tradeoffs or risks: Showing options adds density and makes each simulation stage taller. Compact cards, progressive disclosure through the existing stage controls, and a consistent label hierarchy keep the decision readable without turning the walkthrough into a full transcript.
- Verification: Confirm all four questions are numbered, each has exactly one visible recommendation and rationale, every option names a tradeoff, step 05 remains the final output, build succeeds, tests pass, and the responsive page is reviewed in the local browser.
