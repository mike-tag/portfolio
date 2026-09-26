# Navigation rebuilt around the visit

Date: 2026-09-11. Status: implemented for review. This supersedes the always-visible section/page navigation described in portfolio-navigation-design-decisions.md.

## Brief

The primary audience is a prospective employer or collaborator arriving from a profile, resume, or shared case link. Their likely question is whether Mike can lead useful AI transformation from redesign to implementation to adoption. The desired outcome is an informed conversation, supported by work they have actually inspected. This is a design hypothesis drawn from Mike's brief and the existing portfolio, not a finding from visitor research.

The first screen should establish identity and relevance, then offer an obvious route into proof. The visitor should not need to know project names or distinguish evidence libraries from working tools before deciding where to start. Returning visitors should still be able to reach a specific example directly.

## Options and decision

1. A compact global header, a clear homepage exploration action, and a grouped work menu. Project detail stays local; the bottom of each case offers a relevant continuation. Chosen because it supports both first-time discovery and direct access without filling the first screen with a sitemap.
2. Always-visible capability tabs and secondary page links. Easy to scan as a directory, but exposed seven Advocacy links at once, treated a category as one arbitrarily selected project, and left the homepage without the same navigation. Replaced.
3. A strictly sequential portfolio tour. Would tell a strong narrative but delay visitors who already know which proof they need. Not chosen; suggested next steps are optional.

## Intended paths

- First visit: introduction → Explore my work → the three illustrated capabilities → a named case or recorded demonstration → contact or another relevant example.
- Shared case link: identify Mike and the current project → inspect its main proof → open supporting pages through In this project when needed → All work or a suggested next example.
- Returning visitor: Explore work → choose a named example under its capability → resume or LinkedIn when ready.

## Implementation decisions

- The same compact header appears on the homepage and all public subpages. Mike's name returns to the introduction; Explore work opens the grouped examples; Resume downloads the PDF; Let's talk names LinkedIn in its accessible label and opens it in another tab.
- The primary homepage action is Explore my work. Resume and contact remain in the header and closing actions. The existing three illustrations and concise chapter titles carry the story.
- All work returns to the illustrated overview, not the top of the bio. Its hash query works on direct load, reload, history navigation, and from the nested static demo document.
- The work menu contains six concrete proofs grouped under the three themes. The themes are headings, so they do not misleadingly navigate to the first item in a group.
- Each subpage has a compact breadcrumb. Supporting Advocacy routes live behind In this project; enterprise and agent siblings live behind Related work. No second permanent directory row.
- Case endings offer the next relevant proof and a route back to all work. This invites broader evaluation without requiring a guided tour.
- Link wording identifies destination intent: Explore the Advocacy Workbench opens the case study; Inspect the recorded agent demos identifies the recordings as recordings.
- Native links and disclosure buttons support keyboard input. Buttons expose expanded state; opening focuses the first choice; Escape restores the trigger; leaving the header or clicking elsewhere closes the panel. Mobile menus expand in flow; desktop menus overlay the content.
- The unlisted interview presentation remains separate. Existing static evidence and recording boundaries are preserved.

## Verification

Build and test checks plus browser checks of the first screen, overview jump, direct overview URL and reload, disclosure keyboard behavior, project links, nested demo return paths, and desktop/mobile layouts. No analytics or claims of improved conversion are introduced. Mike's review and subsequent hiring conversations are the follow-up signals for whether visitors understand the progression.

Final verification: production build, demo TypeScript check, and all 22 tests passed. Browser QA covered desktop and 390px mobile first screens, open and closed work/project menus, focus on opening, Escape return, overview links and reload, supporting Advocacy navigation, demo-to-portfolio returns, and next-example links. The mobile hero action is visible within the first screen. Shared menu styles explicitly isolate legacy demo nav/section defaults, and the demo build deduplicates React to support the shared interactive component.

