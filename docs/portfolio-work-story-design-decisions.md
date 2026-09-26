# Portfolio work story

- Date: 2026-09-11
- Status: implemented for review
- Audience: prospective employers and collaborators evaluating Mike's ability to rethink work, build practical systems, and support adoption.
- Purpose: make those three capabilities legible as a connected story, then give each an evidence path.
- Desired response: explore the methods and working examples behind each capability.
- Decision: three large editorial illustrations, paired with real HTML headings, short explanations, and links. A repeated teal path connects workflow redesign, system assembly, and people using tools.
- Alternatives: separate product screenshots would demonstrate interface detail more literally, but would communicate less about the relationship between reinvention, implementation, and adoption. Keep actual products accessible through the links.
- Tradeoff: images are conceptual illustrations, not screenshots or evidence of measured adoption. Copy describes tools and intent without claiming validated outcomes.
- Scope: homepage work section only. The building chapter links to the existing design method; the unlisted interview presentation remains unlisted. Advocacy and Skills share the people chapter.
- Accessibility: text lives outside the artwork; each illustration has descriptive alt text; images retain their full aspect ratio; chapter order is identical on desktop and mobile; links have visible keyboard focus. No new motion.
- Assets: `public/work-story/reinvent-work.png`, `build-system.png`, `bring-people-along.png`.
- Generation: built-in imagegen, one generation per asset. Exact prompts in `portfolio-work-story-prompts.md`.
- Verification: production build and all 22 tests passed. Browser review at desktop and 390px mobile confirmed the chapter composition, all three images loaded, and no horizontal overflow. Existing homepage assertions were updated for the requested chapter structure.
- Follow-up: review whether a first-time visitor can distinguish the three capabilities and find a relevant example.

## Review refinement

Removed chapter descriptions, chapter numbers, and the section subtitle at Mike's request. The illustrations, chapter titles, and specific action links now carry the narrative with fewer competing text layers. Existing destinations remain available.

