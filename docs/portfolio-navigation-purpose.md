# Navigation that explains the destination

2026-09-11 — implemented for review. Supersedes the project menus and labels in the earlier navigation records.

## Brief

Mike approved the capability-led page openings and asked to carry that logic through navigation. A prospective employer or collaborator should be able to choose what to learn about Mike, recognize the same destination on arrival, and move back to the relevant part of the story. This is a design judgment based on Mike's feedback, not a visitor-research finding.

## Alternatives and decision

Keep one compact work menu, with purpose-led links and a real return path to each illustrated capability. This removes the competing Related work menu and makes the navigation labels consistent from the homepage through the cases. Merely renaming the old menus would retain two directories with overlapping responsibilities. Restoring a permanent list of every portfolio page would increase first-screen clutter; making every visitor follow a fixed tour would slow visitors with a specific interest.

The three capability headings now link to their actual illustrated sections, not to an arbitrarily chosen example. Each proof's breadcrumb returns to its section. The six examples have one shared source for labels, order, homepage links, menu links, and suggested continuations:

- Reinvent the work: Redesign a role with AI.
- Build the system: Plan how to deliver AI; Investigate what a build needs; Put checks around AI actions.
- Bring people along: Make advocacy easier; Reuse expert methods.

All six are visible in the homepage story, so the second agent example is no longer discoverable only after opening the first demo. Actions describe what the visitor can inspect. The page openings identify the specific case and preserve simulation/evidence qualifications.

The advocacy case remains a portfolio entry. Once a visitor enters the workbench or supporting pages, visible task links help them prepare testimony, find evidence, see examples, understand the method, or read about the pilot. The breadcrumb returns directly to the advocacy case. This keeps the volunteer's working navigation close to their task without showing the entire tool directory on the case-study opening.

At case endings, one See all work link and a named Next destination replace duplicate return links. The sequence remains optional. The last case has a single return action rather than two links to the same overview.

## Interaction and verification

Native hash links support reloads, browser history, and the nested recorded-demo document. Section links focus the corresponding chapter heading. The work disclosure retains keyboard focus, Escape, outside-click, and focus-leave behavior. Current proof highlighting remains visible even on its supporting tool pages. Mobile menus expand in flow; the workbench task row wraps.

Verify root build and tests, demo TypeScript and bundle build, real route resolution under a GitHub Pages subdirectory, all six menu destinations, section return/reload, workbench support navigation, and desktop/mobile keyboard behavior. Mike's review is the next check on whether the wording and structure reduce disorientation.

Verified in the browser: all six proof destinations, all five workbench task routes, case return, desktop and 390px mobile menus, current-item highlighting, keyboard opening and Escape focus return, same-page demo navigation, chapter focus on arrival, and Back/Forward plus reload of chapter URLs. The full work menu fits within the tested mobile viewport and the checked routes have no horizontal overflow. Four navigation tests cover subdirectory-safe links from both apps, the optional six-proof sequence, tool parentage, and valid chapter targets. Root build, demo TypeScript check and bundle rebuild, and all 26 tests passed.

## Formatting consistency pass

Mike requested consistent formatting after approving the structure. Computed browser styles showed the recorded-demo navigation inheriting a narrower shell, larger footer links and padding, different heading tracking, and different focus styling. The shared navigation now owns its type, spacing, container alignment, borders, icon sizes, and interaction states. Recorded-demo content retains its existing shell while navigation sits outside it. This keeps the established hierarchy recognizable across applications without adding another page-specific set of overrides. The enterprise section controls use the same selected and keyboard-focus treatments. Compare the same navigation objects on desktop and mobile, then rebuild both apps and run the required checks.

Completed: matching computed dimensions and type for the shared desktop header controls, menu, headings, and continuation links across the portfolio and recorded demos. Visual checks at 1440px, 390px, and 320px confirmed aligned controls, wrapped bottom links, visible focus rings, and no horizontal overflow. Workbench and delivery selected controls share the same background and border colors. Demo TypeScript check, both production builds, and all 26 tests passed.
