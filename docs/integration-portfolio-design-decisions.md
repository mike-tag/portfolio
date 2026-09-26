# Integration demonstrations in the portfolio

## Opening architecture — 26 September 2026

The portfolio demos show a system overview in its own full-width section after the introduction and scenario controls, before the walkthrough. A first pass beside the controls crowded the opening; user feedback moved the diagram below it. Visitors first see the browser, hosted Node app, external model, and the tools' data source. Each overview lists the same numbered steps used below. Feasibility shows curated references; integration shows the temporary simulated screening service and recruiting record. Technical endpoint details remain in each step. The duplicate bottom architecture disclosure is removed from the portfolio entry; the original live entry retains its existing diagram. This favors an immediately visible overview over a detailed infrastructure drawing hidden at the end. Mobile layouts stack the overview before scenario selection.

## Outcome and scope

Hiring reviewers can inspect a working example alongside Enterprise AI delivery without an access code or model usage. Two public versions reuse the tested story components and five real hosted captures; existing live and interview entry points retain their titles and behavior.

## Decisions — 11 September 2026

- Name the pages Integration Feasibility and Background Check Integration. Explain model interpretation in the first, tool selection and deterministic validation in the second. Do not imply a connected end-to-end agent or a real vendor deployment.
- Use the settled Enterprise AI delivery palette: paper, navy, forest green, and pale sage. Preserve the vertical progression, viewport chapters, architecture diagrams, and expandable evidence.
- Prefer a compact proof block in the Build section over another homepage card. It connects the proposed delivery model to implemented evidence without duplicating the portfolio's top-level navigation.
- Serve recorded versions as static pages in `public/integration-agents/`, with hash routes `#/feasibility` and `#/integration`. Keep live execution as an explicitly separate, access-controlled link. A direct live link alone would require credentials and server availability before visitors could inspect evidence.
- Clearly label recordings and retain source dates, original downloads, and fingerprints. Preserve vendor documentation attribution and simulated-data qualifications. Export no interview notes or credentials.
- Shared components accept optional introduction copy. Portfolio styling loads only in the new entry point, protecting the original live and offline experiences.

## Build and validation

Run `pnpm --dir feasibility-agent build:portfolio` after changes to portfolio demo source or captures, then the root build to include generated static assets. The normal portfolio build consumes the checked-in generated export without needing agent-server dependencies or secrets. Run both projects' build and tests. Check both public routes, all five replay selections, expandable evidence, successful and blocked outcomes, return/live links, keyboard navigation, and mobile overflow. Check captured JSON against original SHA-256 hashes. Publication is a separate step.

## Review results

- Agent build and 29 tests passed; portfolio build and 22 tests passed.
- All three feasibility selections returned their captured assessments. Both endpoint selections returned their captured outcomes: revision 1 after a valid response, revision 0 and no PATCH after a missing status.
- Verified reference disclosure by keyboard, page switching, title updates, the live-link destinations, and the return link into Enterprise AI delivery. Skip navigation retains the selected demo route.
- Reviewed desktop and 390px layouts; no horizontal overflow on either demo route. Diagrams inherit the forest-green accent, with failure states retaining their distinct rust color.
- All five original capture fingerprints match. Generated HTML passed the company-name and credential-pattern scan and embedded JavaScript syntax check. No new model calls were made.
- New versions are local preview artifacts pending publication.
