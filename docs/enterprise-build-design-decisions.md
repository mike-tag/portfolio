# Enterprise AI delivery

## Purpose and audience

A public portfolio walkthrough for enterprise leaders evaluating Mike's approach to AI delivery. Readers should understand how a workflow moves from business priority to a maintained, reusable asset without needing the interview context.

## Decisions

- Preserve the Reejig presentation at `#/the-build`, including its original component and stylesheet. Create an independent version at `#/enterprise-build` so portfolio revisions cannot change the interview artifact.
- Retain the large type, concise copy, four-stage cycle, and sticky section trail. A full redesign would discard the visual system already refined with the user without improving this adaptation's purpose.
- Replace company-specific products with business priorities, work inventories, and feasibility assessment. Frame the page as a proposed delivery approach, not a claim about a particular company's capabilities or results.
- Use forest green (`#2e493b`) and pale sage (`#dce1d6`) instead of violet, retaining paper and navy for legibility and continuity with the portfolio.
- Adapt vendor commercialization to enterprise funding for activation, shared reuse, and upkeep. Keep measurement qualifications and engineering responsibilities explicit.
- Link from the homepage's system-building chapter and provide a Portfolio return link. Preserve the homepage's current work-story layout.

## Tradeoff and checks

Language review: the public narrative now uses Select, Build, Prove, and Reuse. Library entries describe measured use, readiness to share, and reuse elsewhere rather than a certification scheme. Work samples and qualified usage analysis replace the interview-specific measurement proposals. Deployment funding, explicit delivery ownership, and early engineering review replace vendor packaging and interview talking points. Existing DOM IDs remain stable; the original interview files and newly added demo proof are preserved.

Independent styles duplicate the original implementation intentionally to protect the interview version. Future fixes may need to be applied to both versions separately. Check route isolation, absence of company-specific text in the new source, production build, tests, and responsive rendering before handoff.
