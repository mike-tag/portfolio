# Shared portfolio navigation

- Date: 2026-09-11
- Audience and goal: visitors should recognize the same three capabilities on every public subpage and move between related examples without returning home.
- Decision: use a single shared React navigation component for the portfolio routes and the separately built recorded agent demos. The top row contains Mike's home link and Reinvent the work / Build the system / Bring people along. A second row exposes related destinations; advocacy pages also expose their support pages.
- Alternative: a single flat list of all projects would require less hierarchy, but would abandon the three-part story and grow crowded as examples are added. Native links in two wrapping rows keep the hierarchy visible without dropdown interaction.
- Active state: the current section uses aria-current="location" and the specific destination uses aria-current="page". Text labels stand alone without subtitles. Focus rings and wrapping layouts support keyboard and mobile use.
- Routes: role transformation belongs to Reinvent; enterprise delivery and both recorded agent demos belong to Build; Advocacy, its support pages, and Skills belong to People. Relative URLs support both the root app and the nested static agent document on GitHub Pages.
- The unlisted interview presentation keeps its presentation controls. Enterprise delivery keeps its local stage controls below the common header, with sticky rather than fixed positioning so it cannot cover the portfolio navigation.
- Homepage chapter links and existing in-page links remain available. Demo source is rebuilt into public/integration-agents rather than editing generated HTML.
- Verification: root build and tests, demo rebuild and TypeScript check, then bounded browser review of section selection, relative links, and narrow layouts.

Verification completed: root build and all 22 tests passed; recorded demos rebuilt and their TypeScript check passed. Browser checks covered Transformation, enterprise delivery, both recorded demos, Advocacy, Skills, and all five Advocacy support routes. Active section/page states and relative return links were correct; tested mobile layouts at 390px had no horizontal overflow.

