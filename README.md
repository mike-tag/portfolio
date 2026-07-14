# VAV Advocacy Workbench

A founder-ready pilot that helps Veterans for All Voters volunteers turn a real advocacy assignment into a values-led, audience-aware, evidence-backed work packet.

The same GitHub Pages site now includes a **Consulting Reformed** section for interview and portfolio audiences. It begins with a problem-first point of view on why AI deployments stall, then provides a guided Transformation Factory example that turns an illustrative Procurement Operations Manager posting into task hypotheses, transparent AI/O-ring judgments, a role-and-workflow design, and a downloadable pilot packet.

Open primaries and the New York City commission scenario are the first complete playbook. The structure is intended to expand to additional election-reform issues after volunteer testing.

## What the pilot does

- explains the value to VAV leadership up front;
- guides a volunteer through four clear stages;
- supports named public officials and institutions as audience personas;
- distinguishes public facts from strategic judgment;
- incorporates the VAV values and messaging guide;
- connects evidence claims to their best use and caveats;
- produces a copyable and downloadable work packet;
- includes an annotated NYC testimony example and method guide.
- lets visitors switch between the advocacy experience and the Consulting Reformed Transformation Factory demonstration;

## What it does not do

- call an AI service;
- ask for or store an API key;
- create user accounts;
- send form data to a server;
- claim that every evidence record has completed underlying-source verification.

## Run locally

Requirements: Node.js 22.13 or later and pnpm.

```text
pnpm install
pnpm dev
```

The local address will be printed after the development server starts.

## Validate the site

```text
pnpm run build
pnpm test
```

The production site is generated in `dist/`.

## GitHub Pages deployment

The public demo is deployed from the [`vav-public-demos`](https://github.com/mike-tag/vav-public-demos) repository at:

<https://mike-tag.github.io/vav-public-demos/>

The workflow in `.github/workflows/deploy.yml` builds, tests, and publishes the site whenever a change is pushed to `main`. The repository can grow to include additional public demos over time. Local source PDFs and Word documents are ignored by Git and are not included in the site.

## Evidence status

`Synthesis checked` means a claim has been traced to the local evidence review and its page location. `Refresh needed` identifies a useful lead whose primary data or current figure must be checked before use. The next content milestone is to verify every underlying study, official dataset, and legal authority directly.
