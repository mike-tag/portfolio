# Mike Tagariello AI transformation portfolio

A static portfolio showing how Mike turns AI capabilities into better work and lasting value. The front page routes hiring decision-makers to three working examples:

- **Consulting Reformed:** an evidence-led method for moving from a job posting to task decisions, role redesign, controls, and a bounded pilot;
- **Reusable AI skills:** a small collection of inspectable agent workflows, beginning with Design Planning;
- **Advocacy Workbench:** a values-led product that turns audience context, lived experience, and qualified evidence into a reusable drafting packet.

Each case is designed for a short hiring review. The main narrative shows the problem, Mike's contribution, a representative proof, and the next action. Detailed methodology, sources, and installation guidance remain available through progressive disclosure.

## Advocacy product

The Veterans for All Voters pilot remains a complete, functional product beneath the hiring-oriented case study. Open primaries and the New York City commission scenario are the first issue playbook.

The product:

- guides an advocate through four stages;
- distinguishes known public facts from strategic judgment;
- connects evidence claims to sources, best uses, reform types, caveats, and verification status;
- generates a copyable and downloadable work packet;
- keeps factual verification and final message decisions with the advocate.

## Static by design

The site does not call an AI service, collect API keys, create accounts, send form data to a server, or run analytics. Interactive demonstrations use prepared local data and browser-session state.

## Run locally

Requirements: Node.js 22.13 or later and pnpm.

```text
pnpm install
pnpm dev
```

## Validate

```text
pnpm run build
pnpm test
```

The production site is generated in `dist/` and uses reload-safe hash navigation for GitHub Pages.

## Evidence status

`Source checked` means the underlying publication and locator have been reviewed while the stated caveat still applies. `Refresh needed` identifies a current figure, commentary, or research lead that must be confirmed against the latest primary source before public use.
