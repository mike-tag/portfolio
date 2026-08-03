# Skills market design decisions

> Status update, 2026-07-25: The five-stage, character-led case-study format below was revised by the shared [portfolio subpage decisions](./portfolio-subpage-design-decisions.md). Skills remains an expandable collection, but each skill now proves its judgment through three representative moments and keeps installation detail behind progressive disclosure.

## Decision: Demonstrate the method before distributing the file

- Status: revised
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

- Status: superseded
- Artifact or area: Design Planning simulation
- Date: 2026-07-16
- Audience and need: First-time visitors need to distinguish what the user supplies, what the skill does, and the question the skill asks at each stage.
- Decision and rationale: Use Scout, a border collie with a compass tag, as the consistent speaker for Design Planning. Border collies signal attentive, purposeful guidance; the compass connects the character to decision-making without adding interface jargon. Every response is phrased as a representative question and labeled “Design Planning asks.”
- Tradeoffs or risks: A character can make a professional workflow feel decorative. Scout is confined to the question component, uses the established palette, and remains secondary to the question text.
- Verification: Confirm the speaker remains legible at desktop and mobile sizes, each stage presents a question, and the image has meaningful alternative text.

## Decision: End the simulation with the deliverable

- Status: revised
- Artifact or area: Design Planning simulation, step 05
- Date: 2026-07-16
- Audience and need: Visitors need to see what the skill gives them, not only how it conducts the interview.
- Decision and rationale: Steps 01–04 show Scout asking questions; step 05 changes to a light document-style output card listing the plan's sections. The visual change marks the transition from conversation to artifact.
- Tradeoffs or risks: The simulated document is representative rather than a complete plan. It lists the real plan structure and keeps the static-walkthrough qualification nearby.
- Verification: Confirm step 05 is labeled Output, the document sections are readable, and the review–refine–builder-agent handoff appears inside the output card.

## Decision: Make recommendation quality visible in the simulation

- Status: revised
- Artifact or area: Design Planning simulation, steps 01-04
- Date: 2026-07-17
- Audience and need: Visitors evaluating the skill need to see how it reaches a recommendation, not merely that it asks questions or produces a polished plan.
- Evidence or known facts: The revised Design Planning skill requires numbered user-facing questions, visibly labeled recommendations, an immediate rationale grounded in the brief, and a concise tradeoff for every option.
- Options considered: Summarize the revised behavior in the solution copy; demonstrate the full question, recommendation, rationale, and tradeoff pattern inside each simulation stage.
- Decision and rationale: Preserve the five-stage walkthrough and make steps 01-04 representative choice prompts spoken by Scout. Each stage asks one numbered question, leads with a recommended option, explains why it fits the known brief, and keeps credible alternatives and tradeoffs visible. This lets visitors inspect the skill's judgment before installing it.
- Tradeoffs or risks: Showing options adds density and makes each simulation stage taller. Compact cards, progressive disclosure through the existing stage controls, and a consistent label hierarchy keep the decision readable without turning the walkthrough into a full transcript.
- Verification: Confirm all four questions are numbered, each has exactly one visible recommendation and rationale, every option names a tradeoff, step 05 remains the final output, build succeeds, tests pass, and the responsive page is reviewed in the local browser.

## Decision: Frame Skills as task-level, reusable proof

- Status: implemented
- Artifact or area: Skills collection hero and Design Planning recommendation moment
- Date: 2026-07-26
- Audience and need: A hiring manager should understand from the opening claim that Mike can work at the task level of AI transformation, encode specialist judgment in a reusable skill, and publish something another person can inspect, install, and use.
- Project goal: Complete the portfolio progression from organizational role redesign, to a working AI-assisted workflow, to a shareable skill for one specific task.
- Options considered: Retain a general statement about agent decision quality; explain the portfolio progression only in supporting copy; make the title a direct capability claim and use the supporting copy to locate it within the broader portfolio.
- Decision and rationale: Lead with “I turn task-level expertise into AI skills people can inspect, install, and use.” The adjacent copy explicitly connects this proof to the role-redesign and workflow-system cases. In the recommendation moment, replace the static four-field summary with a four-turn product-owner and UX-design-partner exchange, followed by the same reviewable recommendation record.
- Tradeoffs or risks: The explicit portfolio progression is less evergreen if project names change, and the dialogue makes the second moment taller. The copy is easy to revise, while the short exchange is limited to the decision-changing turns and retains the compact three-moment model.
- Verification: Confirm the capability claim is understandable without prior-page context; the conversation identifies both roles and has a logical question-answer sequence; the recommendation, rationale, tradeoff, and alternative remain visible; keyboard state, responsive layout, build, tests, GitHub link, and install disclosure still work.

## Decision: Credit the design-decision reference openly

- Status: implemented
- Artifact or area: Skills collection closing content
- Date: 2026-08-02
- Audience and need: Visitors should be able to distinguish Mike's reusable skill from the published thinking that informed its approach to explaining recommendations and tradeoffs.
- Decision and rationale: Add a concise research credit after the skill collection and before the contact panel naming Tom Greever, identifying *Articulating Design Decisions*, and linking to his author-provided resources. This keeps attribution visible without interrupting the skill demonstration or installation path.
- Tradeoffs or risks: A long bibliography would compete with the portfolio close, so the page links to one authoritative resource hub while the internal design record retains the fuller source list.
- Verification: Confirm the author, title, and link are accurate; the note remains readable at desktop and mobile sizes; and the external link is keyboard accessible.

## Decision: Let visitors make the recommendation moment's decision

- Status: implemented
- Artifact or area: Design Planning three-moment walkthrough
- Date: 2026-08-02
- Audience and need: Hiring managers and prospective skill users need to experience the skill as a design partner that asks focused questions, compares credible paths, makes its own judgment visible, and waits for the product owner to decide.
- Project goal: Show why the dialogue is useful rather than merely describing that a dialogue occurred, then connect the chosen direction to an executable written plan.
- Options considered: Keep the compact transcript and recommendation summary; expand the transcript; turn the second moment into a small interactive decision with selectable alternatives.
- Decision and rationale: Preserve the three-moment structure and make moment two a representative decision point. The skill first establishes the product owner's priority, recommends one of three directions, and shows the description and trade-off for every option. The visitor must select a direction before advancing, after which the skill confirms that it will carry the choice into the plan. Moment three explicitly presents a written plan of action that can be executed with Codex, Claude Code, or another builder agent.
- Tradeoffs or risks: The interactive comparison is taller than a summary card and is still representative rather than a live agent exchange. Responsive stacking, semantic fieldset controls, visible selected state, and the existing static-walkthrough qualification keep the experience clear and honest.
- Verification: Confirm all three options are keyboard operable, exactly one is labeled as the skill's recommendation, every option names a trade-off, advancing is disabled until a decision is selected, restart clears the selection, the final moment states that the written plan can be executed with another agent, and desktop/mobile layouts pass visual review.

## Decision: Replace the hero explanation with the skill lifecycle

- Status: implemented
- Artifact or area: Skills collection hero
- Date: 2026-08-02
- Audience and need: Hiring managers and prospective users should understand how task expertise becomes something they can actually inspect, install, use, and execute without reading an introductory paragraph.
- Options considered: Keep the portfolio-progression paragraph; visualize the full portfolio from organization to task; show the lifecycle of one reusable skill.
- Decision and rationale: Pair the capability headline with a four-stage lifecycle: encode judgment, package the skill, install and use it, then execute the written plan. This directly visualizes the promise made by the headline and prepares visitors for the working proof below. The broader organization-to-workflow-to-task progression is handed to the Front Page task, where it can orient the complete portfolio.
- Tradeoffs or risks: The lifecycle carries less narrative context than the removed paragraph. Short explanatory lines and semantic list structure preserve meaning while keeping the hero scannable.
- Verification: Confirm the sequence reads clearly at desktop and mobile sizes, its text remains accessible without relying on the connecting line, the hero hierarchy does not overlap, and the build and test suite pass.

## Decision: Let the lifecycle carry the hero detail

- Status: implemented
- Artifact or area: Skills collection headline
- Date: 2026-08-02
- Audience and need: Visitors should grasp the core capability immediately without reading the same inspect-install-use story twice.
- Decision and rationale: Shorten the headline to “I turn task-level expertise into reusable AI skills.” The adjacent lifecycle now carries the operational detail from encoded judgment through execution.
- Tradeoffs or risks: The headline alone is less specific about how the skills are used, so it remains paired with the semantic lifecycle visual at every breakpoint.
- Verification: Confirm the headline and lifecycle read as one idea, the shorter line balance improves the hero, and no overlap appears at desktop or mobile sizes.

## Decision: Make the hero lifecycle about skill creation and sharing

- Status: implemented
- Artifact or area: Skills collection hero lifecycle
- Date: 2026-08-02
- Audience and need: Visitors should understand Mike's general method for turning expertise into reusable, shared skills before encountering the specific Design Planning example.
- Decision and rationale: Reframe the four stages as find the judgment, encode the method, publish the skill, and learn through reuse. The skill card below owns the Design Planning-specific interview and execution story.
- Tradeoffs or risks: The generalized visual cannot show the depth of any one workflow, so the first published skill immediately follows as concrete proof.
- Verification: Confirm the lifecycle reads as a general reusable pattern, publishing and installation remain explicit, and the Design Planning example is not needed to interpret the sequence.
