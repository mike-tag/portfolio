# VAV Advocacy Workbench

A founder-ready pilot that helps Veterans for All Voters volunteers turn a real advocacy assignment into a values-led, audience-aware, evidence-backed work packet.

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

## GitHub Pages handoff

The project includes a deployment workflow at `.github/workflows/deploy.yml`. When the site is ready to publish:

1. Create and verify a GitHub account and enable two-factor authentication.
2. Create an empty repository named `open-primaries-advocacy-workbench`. Do not add a README or `.gitignore` on GitHub because those files already exist here.
3. Connect this local folder to that repository and push the `main` branch.
4. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the source.
5. Run the deployment workflow or push another change to `main`.

On GitHub Free, the repository must be public before GitHub Pages can publish it. The local source PDFs and Word documents are ignored by Git and are not included in the site.

## Evidence status

`Synthesis checked` means a claim has been traced to the local evidence review and its page location. `Refresh needed` identifies a useful lead whose primary data or current figure must be checked before use. The next content milestone is to verify every underlying study, official dataset, and legal authority directly.
