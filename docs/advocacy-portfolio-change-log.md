# Advocacy portfolio and MVP change log

This log keeps hiring-manager portfolio changes distinct from work intended to advance the volunteer-facing Veterans for All Voters MVP.

## Protected MVP boundary

The following remain shared, functional product surfaces and must not change as a side effect of portfolio work:

- `#/workbench` and `src/pages/WorkbenchPage.tsx`
- Work-packet generation in `src/lib/workPacket.ts`
- Advocacy frames, values, prompts, examples, and review steps
- Evidence claims, underlying sources, caveats, and verification status
- Session persistence and the four-step volunteer workflow
- Evidence, Method, Examples, and About page content

## Change record

### Decision: Convert the Advocacy landing page into a portfolio case study

- Status: implemented
- Artifact or area: `#/advocacy`
- Date: 2026-07-14
- Audience served: portfolio
- Audience and need: Hiring managers need to understand the volunteer problem, Mike Tagariello's product decisions, and the working result in a short scan.
- Project goal: Show how a personal ChatGPT advocacy workflow became a reusable, responsible AI product for other advocates.
- Evidence or known facts: The functional Workbench already exists at `#/workbench`; its evidence, method, values, and human-review controls are separate supporting surfaces.
- Assumptions: A compact case study will make Mike's contribution clearer without reducing direct volunteer access to the Workbench.
- Constraints: Preserve VAV values and visual character; keep the site static; do not change the protected MVP boundary.
- Options considered: Keep a volunteer-oriented promotional landing page; send visitors directly to the tool; create a hiring-manager case study while retaining direct tool access.
- Decision and rationale: Use `#/advocacy` for the case study and keep `#/workbench` as the operational product. This serves portfolio comprehension while protecting the current MVP.
- Files/routes affected: `src/App.tsx`, the Advocacy case-study page component, isolated case-study styles, and `tests/site.test.mjs`.
- MVP impact: none
- Future operational action: Create a separate volunteer landing page that reuses the current Workbench, evidence, and data rather than copying them.
- Tradeoffs or risks: Volunteers should be directed to `#/workbench` until the separate volunteer landing page exists. The page must identify itself as a prototype/pilot rather than an official production VAV service.
- Verification: Hiring-manager comprehension check, direct Workbench regression check, keyboard/mobile review, production build, and automated tests.
- Follow-up owner or trigger: Mike Tagariello; revisit when operational MVP work resumes or a VAV leader reviews public organizational representation.

## Implementation entries

| Date | Change | Audience served | Reason | Files/routes affected | MVP impact | Future operational action | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-07-14 | Reframed Advocacy landing as a four-part product case study | Portfolio | Show the problem, workflow transformation, responsible decisions, and working product | `#/advocacy` and its page component | None | Reuse the strongest explanation selectively on a future volunteer landing page | Implemented |
| 2026-07-14 | Made Evidence and Method the first case-study actions, with Workbench access retained | Portfolio | Let hiring managers inspect the system before using it | `#/advocacy` links only | None | Test whether volunteers prefer direct tool access on their future landing page | Implemented |
| 2026-07-14 | Added transparent role attribution: product strategy, research synthesis, workflow design, UX direction, and agent-assisted prototyping with Codex | Portfolio | Describe Mike's contribution accurately | `#/advocacy` only | None | Do not automatically carry personal attribution into the volunteer-facing version | Implemented |
