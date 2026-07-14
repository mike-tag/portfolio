# Articulating Design Decisions

Use this guide whenever work involves meaningful product or visual design decisions, including websites, applications, HTML prototypes, slide decks, documents, diagrams, charts, graphics, and other designed artifacts.

This is an original working guide informed by Tom Greever's published material on articulating design decisions. It is not a reproduction or substitute for his book.

## Core principle

A design is not finished when it looks polished. It is finished when the intended audience can use it, the important choices support an agreed goal, and the rationale is clear enough for other people to understand, evaluate, and carry forward.

Do not justify a choice with taste alone. “It looks cleaner,” “it feels modern,” and “this is a best practice” are incomplete explanations. Connect the choice to a user need, project goal, evidence, constraint, tested convention, or explicit tradeoff.

## Start with a small design brief

Before making visual choices, write concise answers to these questions. Infer answers from the task and available materials when they are clear. Ask only when a missing answer would materially change the result.

- **Purpose:** What practical outcome should this artifact enable?
- **Primary audience:** Who must understand or act, and in what context?
- **Audience need:** What question, concern, or task brings them here?
- **Desired response:** What should they know, feel, decide, or do afterward?
- **Content hierarchy:** What must be noticed first, understood second, and acted on next?
- **Constraints:** What technical, accessibility, brand, content, format, time, or budget limits apply?
- **Success signal:** What observable result would show the design is working?

For substantial work, retain these answers in the task notes or a design decision record. For a small change, a compact rationale is enough.

## Understand the people involved

Apply empathy to both end users and the people who will review, approve, build, maintain, or present the work.

### User perspective

Identify:

- what the user is trying to accomplish;
- what they already know and what may be unfamiliar;
- their likely environment, device, time, and attention constraints;
- what may confuse, delay, exclude, or distract them;
- what would help them feel oriented and in control.

Do not invent research. Separate known behavior from assumptions. Label uncertain beliefs as hypotheses to test.

### Stakeholder perspective

For each important reviewer or collaborator, identify:

- their role and responsibility;
- the outcome they are accountable for;
- what they may value or worry about;
- what they need from the review;
- what question or objection they are likely to raise;
- how much influence they have over the decision or implementation.

Stakeholder empathy is not agreement. It helps frame the rationale in terms other people can understand and makes useful concerns easier to surface.

### Shared ownership

Treat design as team work. Research, content, engineering, business, accessibility, operations, legal, and presentation concerns can all improve a design. Invite relevant expertise early, while choices are still reversible.

## Make decisions from goals

Use this chain for every consequential choice:

> Because **the audience needs X**, and **the project goal is Y**, we chose **Z**. This helps by **expected effect**. We accepted **tradeoff or limitation**. We will verify it with **check or evidence**.

Example:

> Because a first-time visitor needs to know where to begin, and the product should help them complete a task quickly, we place one primary action after a short orientation. This reduces competing choices on entry. The tradeoff is that advanced paths are less prominent, so we will verify that returning users can still find them easily.

### Strength of rationale

Match the explanation to what is actually known:

- **Research finding:** cite the study, observation, or source.
- **Measured behavior:** identify the metric and relevant context.
- **Documented constraint:** point to the requirement, technology, brand rule, or delivery format.
- **Established convention:** name the usability or accessibility principle and explain why it applies.
- **Strategic judgment:** label it as a recommendation or hypothesis.
- **Open question:** state what would need to be tested or confirmed.

Never present a preference as research or a hypothesis as a proven outcome.

## Explore before committing

For a meaningful design direction, consider at least two plausible approaches, even if only one is built. Compare them against the same criteria:

- audience comprehension;
- alignment with the purpose;
- accessibility and inclusion;
- content integrity;
- implementation and maintenance cost;
- fit for the delivery format;
- likely risks and reviewer concerns;
- reversibility;
- means of verification.

Lead with the recommended direction. Keep alternatives available when they clarify the tradeoff or address an expected objection. Do not generate arbitrary variants merely to create the appearance of exploration.

## Reduce cognitive load

Design both the artifact and the experience of reviewing it.

- Establish context before showing detail.
- Use real or clearly labeled representative content. Avoid lorem ipsum and misleading placeholders.
- Remove accidental distractions unrelated to the decision being reviewed.
- Give each screen, section, or slide a coherent job.
- Use hierarchy, spacing, sequence, and labels before adding decoration.
- Make state, selection, progress, and next actions visible.
- Keep qualifications or conditions near the content they affect.
- Avoid showing unfinished details at a fidelity that invites the wrong kind of feedback.
- For a focused review, identify what is decided, what is provisional, and what feedback is needed.

High fidelity creates expectations. If a concept is exploratory, say so and show only enough polish to evaluate the intended question.

## Present the rationale, not a tour of pixels

When explaining a design, use this order:

1. Re-establish the audience and purpose.
2. State the decision or recommendation.
3. Explain how it supports the goal.
4. Point to research, evidence, constraints, or conventions that shaped it.
5. Name the main alternative and tradeoff when useful.
6. State what feedback or agreement is needed.

Describe outcomes before implementation details. Say “This keeps the guidance visible when the user needs it,” before explaining the component or layout that makes it happen.

### Prepare important reviews

Before a high-impact review:

- write a short agenda and identify the decision needed;
- understand who will attend and what each person needs from the review;
- anticipate objections and prepare honest answers;
- have relevant evidence and alternatives available without overwhelming the opening presentation;
- remove placeholders or visual noise likely to derail the discussion;
- rehearse the explanation aloud;
- ask a teammate with relevant expertise to check the rationale;
- confirm that the environment, links, prototype, and presentation mode work.

The more expensive or irreversible the decision, the more deliberate the preparation should be.

## Listen and respond to feedback

Feedback is information about a need, risk, misunderstanding, constraint, or preference. Do not accept or reject it based only on seniority, confidence, or wording.

Use this response sequence:

1. **Listen fully.** Do not compose a rebuttal while the person is speaking.
2. **Clarify.** Ask what outcome or concern is behind the requested change.
3. **Restate.** Confirm the concern in neutral language.
4. **Connect.** Bring the discussion back to the agreed audience and goal.
5. **Explain.** Give the relevant rationale, evidence, constraint, and tradeoff.
6. **Advance.** Recommend a next step: keep, revise, compare, test, or defer with an owner.

Lead with what is useful or valid in the feedback. Be willing to change the design when the feedback exposes a better way to serve the goal. The objective is not to win an argument; it is to reach a sound, shared decision.

When people disagree, separate these cases:

- **Goal disagreement:** align on what the artifact must accomplish.
- **Fact disagreement:** verify the source or constraint.
- **Interpretation disagreement:** expose assumptions and compare risks.
- **Taste disagreement:** prefer the choice that best serves the user and system coherence.
- **Unknown:** identify the smallest useful test or reversible next step.

## Follow through

A decision is not complete when the meeting ends.

- Summarize the decision, rationale, and unresolved questions promptly.
- Record changes without forcing people to reconstruct the conversation.
- Identify owners and triggers for follow-up work.
- Confirm when feedback has been incorporated and explain any material departure from what was agreed.
- Preserve the rationale near the work so future collaborators can find it.
- Revisit a decision when its assumptions, constraints, or evidence change.

## Record consequential decisions

Use this template in task notes, a project log, or a review summary when a choice affects the overall experience, accessibility, brand expression, system behavior, cost, or future work.

```markdown
### Decision: [short name]

- Status: proposed | accepted | revised | superseded
- Artifact or area:
- Date:
- Audience and need:
- Project goal:
- Evidence or known facts:
- Assumptions:
- Constraints:
- Options considered:
- Decision and rationale:
- Tradeoffs or risks:
- Verification:
- Follow-up owner or trigger:
```

Keep the record proportional. Do not create paperwork for routine choices that follow an established system.

## Craft guidance by artifact

These are prompts for evaluating decisions, not a replacement for the standards of a particular project or medium.

### Websites and applications

- Start with semantic structure and the core user path.
- Make the primary action clear at each decision point.
- Use familiar patterns unless a different interaction has a clear benefit.
- Provide keyboard access, visible focus, semantic labels, sufficient contrast, responsive behavior, and reduced-motion support.
- Consider loading, empty, error, completed, selected, and disabled states when they exist.
- Test narrow layouts, zoom, keyboard-only use, and actual content—not only a polished desktop view.

### Slides and presentations

- Give each slide one communicative job and a takeaway-style title.
- Build a narrative with a clear beginning, progression, and conclusion.
- Prefer meaningful charts, diagrams, or examples over decorative imagery.
- Put source locators and material qualifications on the slide where the claim appears.
- Make the deck understandable to someone who receives it after the presentation.
- Rehearse the spoken transition between major sections.

### Charts, diagrams, and graphics

- Use a visual when it makes a relationship easier to understand than prose.
- State what the viewer should learn from it.
- Label axes, units, dates, categories, and uncertainty as applicable.
- Do not imply causation, scale, precision, or consensus that the information does not support.
- Provide a text equivalent or accessible explanation.
- Remove ornamental complexity that competes with the message.

### Documents and reports

- Make reading order and hierarchy unmistakable.
- Keep instructions next to the action they govern.
- Use consistent styles for headings, body text, captions, tables, and callouts.
- Keep related content together and avoid stranded headings or references.
- Check page breaks, margins, tables, links, and final rendering in the delivery format.

### Brand and visual systems

- Use an existing system when one is available.
- Reuse tokens, components, styles, and patterns before adding new ones.
- Make exceptions explicit and explain why the established system cannot serve the goal.
- Identify new brand rules as proposals until they are accepted.
- Check that tone, imagery, typography, color, and motion reinforce the intended experience rather than compete with it.

## Final design review

Before calling designed work complete, verify:

- [ ] The purpose, audience, and desired response are clear.
- [ ] Important choices have goal-based rationales.
- [ ] Known facts, research, assumptions, and preferences are distinguishable.
- [ ] The hierarchy works before decorative styling is considered.
- [ ] Realistic content has exposed likely layout and comprehension problems.
- [ ] Accessibility and inclusion have been checked for the medium.
- [ ] Alternatives and tradeoffs were considered for consequential choices.
- [ ] The design works across its required sizes, states, and contexts.
- [ ] Feedback was resolved, recorded, or assigned a clear follow-up.
- [ ] The artifact was reviewed in its final delivery format.
- [ ] Consequential decisions and verification results are documented proportionally.

## Sources and further reading

These sources informed this guide:

- Tom Greever, [Articulating Design Decisions resources](https://tomgreever.com/resources/) — author-provided project, stakeholder, meeting, and feedback worksheets.
- Tom Greever, [Articulating Design Decisions online workshop](https://tomgreever.com/articulating-design-decisions-sessions/) — the author's summary of stakeholder empathy, designing meetings, and responding to feedback.
- Tom Greever, [Articulating Design Decisions workshop](https://tomgreever.com/articulating-design-decisions-workshop/) — the author's overview of preparation, listening, decision documentation, and feedback practice.
- Tom Greever, [“Articulating Design Decisions” sample chapter](https://www.uxmatters.com/mt/archives/2016/04/articulating-design-decisions.php) — an authorized sample on reducing cognitive load, anticipating reactions, preparing alternatives, and rehearsing reviews.
- O'Reilly Media, [Articulating Design Decisions, 2nd Edition](https://www.oreilly.com/library/view/articulating-design-decisions/9781492079217/) — official overview and chapter structure for Greever's 2020 second edition.
- Tom Greever, [author and speaking archive](https://tomgreever.com/) — links to his talks, essays, and interviews on design communication and stakeholder relationships.

Last researched: 2026-07-13.
