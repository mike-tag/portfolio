import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("production output is GitHub Pages safe", async () => {
  const html = await read("dist/index.html");
  assert.match(html, /<title>VAV Advocacy Workbench<\/title>/);
  assert.match(html, /(?:src|href)="\.\/assets\//);
  assert.doesNotMatch(html, /OPENAI_API_KEY/);
});

test("the homepage states the problem, uses plain language, and shows the visual process", async () => {
  const home = await read("src/pages/HomePage.tsx");
  const workbench = await read("src/pages/WorkbenchPage.tsx");
  assert.match(home, /You know why it matters/);
  assert.match(home, /Finding the right words is the hard part/);
  assert.match(home, /Make your case/);
  assert.match(home, /Create my AI prompt/);
  assert.match(home, /Prompt for your AI tool/);
  assert.match(home, /Built around Veterans for All Voters values/);
  assert.match(home, /advocacy-flow/);
  assert.match(home, /volunteer-advocate\.png/);
  for (const label of ["Your assignment", "Audience + story", "Message + evidence", "Use your prompt"]) {
    assert.match(workbench, new RegExp(label.replace("+", "\\+")));
  }
});

test("both founder-example approaches are selectable and fully annotated", async () => {
  const examples = await read("src/pages/ExamplesPage.tsx");
  assert.match(examples, /setSelectedId/);
  assert.match(examples, /type="radio"/);
  assert.match(examples, /Governance-first testimony/);
  assert.match(examples, /Values-first testimony/);
  assert.match(examples, /Qualified evidence/);
  assert.match(examples, /Specific ask/);
  assert.match(examples, /Evidence to verify before use/);
});

test("each evidence record exposes a verification status and caveat", async () => {
  const content = await read("src/data/evidence.ts");
  const claimIds = [...content.matchAll(/verificationStatus: "(?:page_checked|research_lead)"/g)];
  const caveats = [...content.matchAll(/caveat: "/g)];
  assert.equal(claimIds.length, 22, "expected all 14 source-map records plus 8 research claims");
  assert.equal(claimIds.length, caveats.length);
});

test("the evidence library includes every source-map record and cites underlying publications", async () => {
  const evidence = await read("src/data/evidence.ts");
  for (const id of [
    "independent_registration_shift", "independent_vote_2024", "independent_identity",
    "gen_z_frustrated_engaged", "independent_leverage_2026", "national_closed_exclusion",
    "voters_of_color_independence", "nyc_independent_electorate", "maryland_local_exclusion",
    "closed_primary_rights", "partisan_election_administration", "independence_civic_status",
    "reform_trust_strategy", "new_mexico_campaign_case",
  ]) assert.match(evidence, new RegExp(`id: "${id}"`));
  assert.doesNotMatch(evidence, /sourceLocator|sourceTitle|Source Map, p\.|Evidence Review on Primary Election Reform/);
  assert.match(evidence, /sourceIds: \[/);
});

test("the app has no network or API-key integration", async () => {
  const files = await Promise.all([
    read("src/App.tsx"),
    read("src/pages/WorkbenchPage.tsx"),
    read("src/lib/workPacket.ts"),
  ]);
  const source = files.join("\n");
  assert.doesNotMatch(source, /OPENAI_API_KEY|api\.openai\.com|fetch\s*\(/);
});

test("packet exports carry evidence verification and reform type", async () => {
  const packet = await read("src/lib/workPacket.ts");
  assert.match(packet, /Reform type:/);
  assert.match(packet, /Verification:/);
  assert.match(packet, /REFRESH NEEDED/);
});

test("workbench state persists for page changes and review resets after edits", async () => {
  const workbench = await read("src/pages/WorkbenchPage.tsx");
  assert.match(workbench, /sessionStorage\.setItem\("vav-workbench-state"/);
  assert.match(workbench, /sessionStorage\.getItem\("vav-workbench-state"/);
  assert.match(workbench, /setReviewed\(\[\]\)/);
});

test("the AI handoff is explicit and the human review has exactly three actions", async () => {
  const workbench = await read("src/pages/WorkbenchPage.tsx");
  const content = await read("src/data/content.ts");
  assert.match(workbench, /Paste it into the AI writing tool you use/);
  assert.match(workbench, /Copy for your AI tool/);
  const checklistBlock = content.match(/export const reviewChecklist = \[([\s\S]*?)\];/);
  assert.ok(checklistBlock);
  assert.equal((checklistBlock[1].match(/^\s*"/gm) || []).length, 3);
});

test("purposeful icons appear across every site section", async () => {
  const [home, workbench, sources, method, examples, about, layout, valueIcons] = await Promise.all([
    read("src/pages/HomePage.tsx"),
    read("src/pages/WorkbenchPage.tsx"),
    read("src/pages/SourcesPage.tsx"),
    read("src/pages/MethodPage.tsx"),
    read("src/pages/ExamplesPage.tsx"),
    read("src/pages/AboutPage.tsx"),
    read("src/components/SiteLayout.tsx"),
    read("src/components/ValueIcon.tsx"),
  ]);
  assert.match(home, /ValueIcon/);
  assert.match(workbench, /ClipboardCopy/);
  assert.match(sources, /SearchX/);
  assert.match(method, /ShieldAlert/);
  assert.match(examples, /Landmark/);
  assert.match(about, /Laptop/);
  assert.match(layout, /House/);
  for (const valueId of ["service", "voter_agency", "common_ground", "practical_action", "authentic_voice", "trust"]) {
    assert.match(valueIcons, new RegExp(valueId));
  }
});
