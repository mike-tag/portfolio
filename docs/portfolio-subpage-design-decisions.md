# Portfolio subpage design decisions

## Decision: Design every case for a short hiring review

- Status: implemented
- Artifact or area: Portfolio case pages and Advocacy supporting routes
- Date: 2026-07-25
- Audience and need: Hiring decision-makers need to understand what Mike diagnosed, decided, built, and proved within a two-to-three-minute review.
- Project goal: Make the front page's clarity the editorial standard for every portfolio case without flattening distinct project identities.
- Evidence or known facts: The prior pages exposed multiple process models, repeated the same claims across several visual tiers, and often presented exhaustive methodology before a working proof.
- Assumptions: Hiring reviewers benefit from one visible representative proof and will deliberately open deeper material when the main claim is relevant.
- Constraints: Static React/Vite/TypeScript; hash navigation; no backend or model calls; preserve the functional Advocacy Workbench and every evidence qualification; maintain keyboard, responsive, focus, and reduced-motion support.
- Options considered: Keep each microsite independent; apply one rigid case-study template; use a shared portfolio frame with project-specific proof and styling.
- Decision and rationale: Use a shared Mike Tagariello portfolio frame, give each page one communicative job, show one representative proof by default, and move exhaustive mechanics into accessible disclosures. This makes ownership and judgment immediate while preserving reviewable rigor.
- Tradeoffs or risks: Some technical material requires an extra action to inspect, and the cases give up a degree of microsite independence.
- Verification: Hiring-review comprehension check; keyboard and narrow-screen review; evidence-integrity check; build and automated tests; exact local-route review.
- Follow-up owner or trigger: Mike Tagariello; revisit after direct hiring-manager feedback or when a second public skill changes the collection's information needs.

## Decision: Separate portfolio navigation from product navigation

- Status: implemented
- Artifact or area: Shared site layout
- Date: 2026-07-25
- Audience and need: Portfolio reviewers need consistent ownership and project-to-project navigation, while advocates need a small task-oriented product navigation.
- Decision and rationale: Transformation, Advocacy, and Skills use a shared portfolio frame. The portfolio links follow the story from role redesign to usable workflows to reusable expertise; those labels state what each case demonstrates instead of repeating ambiguous content categories. Operational Advocacy routes promote only the case study, workbench, and evidence library; Method, Examples, and About remain available through contextual links.
- Tradeoffs or risks: Supporting Advocacy routes are less prominent in the global header.
- Verification: Confirm every route has a clear parent, return path, active state, and accessible label.

## Decision: Use shared headline scales across the portfolio

- Status: implemented
- Artifact or area: Portfolio home proof cards and portfolio case-study heroes
- Date: 2026-08-02
- Audience and need: Hiring reviewers need equivalent proof points and case-study titles to communicate equivalent importance as they move from role redesign to usable workflows to reusable expertise.
- Decision and rationale: Use one responsive display scale for every case-study title and one shared scale for every proof-card headline. Preserve each case's typeface, weight, color, measure, and composition so the pages retain distinct identities without implying an unintended ranking through type size.
- Tradeoffs or risks: Longer titles may occupy more lines, particularly on narrow screens. Control line length and wrapping at the component level instead of creating page-specific type scales.
- Verification: Compare computed sizes across all three routes at desktop and narrow viewports; confirm line wrapping, hierarchy, and page overflow remain sound.

## Decision: Preserve rigor through progressive disclosure

- Status: implemented
- Artifact or area: Transformation methodology, Skills installation, Workbench evidence, and Evidence records
- Date: 2026-07-25
- Audience and need: Reviewers need enough concrete detail to trust the work without reading a methods report before understanding its significance.
- Decision and rationale: Keep the representative claim, decision, caveat, or output visible; place formulas, complete source records, installation commands, and extended decision mechanics in semantic disclosures.
- Tradeoffs or risks: A collapsed page can appear less technically dense. Each case therefore keeps one concrete implemented artifact visible by default.
- Verification: Confirm collapsed content never hides a qualification needed to interpret a visible claim and every disclosure works with keyboard and assistive technology.
