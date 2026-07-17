import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("production output is GitHub Pages safe", async () => {
  const html = await read("dist/index.html");
  assert.match(html, /<title>Mike Tagariello \| Generative AI transformation portfolio<\/title>/);
  assert.match(html, /(?:src|href)="\.\/assets\//);
  assert.doesNotMatch(html, /OPENAI_API_KEY/);
});

test("visible interface copy uses sentence case without eyebrow tiers", async () => {
  const [styles, advocacy, transformation, about, sources, examples, workbench] = await Promise.all([
    read("src/styles.css"),
    read("src/pages/AdvocacyCaseStudyPage.tsx"),
    read("src/pages/TransformationPage.tsx"),
    read("src/pages/AboutPage.tsx"),
    read("src/pages/SourcesPage.tsx"),
    read("src/pages/ExamplesPage.tsx"),
    read("src/pages/WorkbenchPage.tsx"),
  ]);
  assert.doesNotMatch(styles, /text-transform:\s*uppercase/);
  const pages = [advocacy, transformation, about, sources, examples, workbench].join("\n");
  assert.doesNotMatch(pages, /className="[^"]*(?:eyebrow|kicker|document-label|source-category|approach-choice)/);
});

test("the front page routes each problem to a focused demonstration", async () => {
  const [app, layout, chooser, page, data] = await Promise.all([
    read("src/App.tsx"),
    read("src/components/SiteLayout.tsx"),
    read("src/pages/ExperiencePage.tsx"),
    read("src/pages/TransformationPage.tsx"),
    read("src/data/transformation.ts"),
  ]);
  assert.match(app, /TransformationPage/);
  assert.match(app, /ExperiencePage/);
  assert.match(app, /page === "advocacy"/);
  assert.match(chooser, /I need to turn AI potential into a practical role redesign/);
  assert.match(chooser, /I need to make a clear 60-second case for voter reform/);
  assert.match(chooser, /I turn generative AI into systems that stick/);
  assert.match(chooser, /mike-tagariello-headshot-illustrated\.png/);
  assert.doesNotMatch(chooser, /Professional headshot forthcoming/);
  assert.match(chooser, /lead transformation from objectives to impact/);
  assert.match(chooser, /aligning senior leaders/);
  assert.match(chooser, /leading value measurement/);
  assert.match(chooser, /<strong>10\+<\/strong><span>Years making technology work for people/);
  assert.match(chooser, /<strong>10<\/strong><span>AI projects in 3 years/);
  assert.match(chooser, /<strong>50k\+<\/strong><span>People reached in just one project/);
  assert.match(chooser, /U\.S\. Air Force veteran/);
  assert.match(chooser, /Columbia University graduate/);
  assert.match(chooser, /https:\/\/www\.linkedin\.com\/in\/miketagariello\//);
  assert.match(chooser, /Connect with Mike on LinkedIn/);
  assert.match(chooser, /\.\/mike-tagariello-resume\.pdf/);
  assert.match(chooser, /download="Mike-Tagariello-Resume\.pdf"/);
  assert.match(chooser, /Download résumé/);
  assert.match(chooser, /href: "#\/transformation"/);
  assert.match(chooser, /href: "#\/workbench"/);
  assert.match(chooser, /href: "#\/skills"/);
  assert.match(chooser, /Browse the skills market/);
  assert.match(chooser, /I need an AI collaborator that understands design principles and leaves me with a usable plan/);
  assert.match(layout, /All demos/);
  assert.match(layout, /Consulting Reformed/);
  assert.match(layout, /MikeSigil/);
  assert.doesNotMatch(layout, /experience-switcher|Choose an experience/);
  assert.match(page, /AI deployments do not have an AI problem/);
  assert.match(page, /They have a work-design problem/);
  assert.doesNotMatch(page, /Choose your lens/);
  assert.match(page, /Role redesign becomes practical when every decision stays reviewable/);
  assert.match(page, /Walk through the evidence, task map, future-state workflow, and pilot packet/);
  assert.match(page, /source, not the truth/);
  assert.match(page, /Automation readiness/);
  assert.match(page, /O-ring disruption/);
  assert.match(page, /What does “O-ring” mean here/);
  assert.match(page, /One weak or unautomated link can constrain the whole workflow/);
  assert.match(page, /Required control/);
  assert.match(page, /Validation status/);
  assert.match(page, /Inspect the completed transformation packet/);
  assert.match(page, /E0, E1, and E2 classify technical capability/);
  assert.match(page, /governance gate/);
  assert.match(data, /Illustrative composite job posting/);
  for (const field of ["exposureAssessment", "oRingJudgment", "requiredControl", "validationStatus"]) assert.match(data, new RegExp(field));
  for (const state of ["Automate", "Accelerate", "Copilot", "Human-control", "Human-only"]) assert.match(data, new RegExp(state));
  assert.doesNotMatch(`${page}\n${data}`, /fetch\s*\(|api\.openai\.com|OPENAI_API_KEY/);
});

test("the skills market explains, demonstrates, and distributes each published skill", async () => {
  const [app, layout, page, data] = await Promise.all([
    read("src/App.tsx"),
    read("src/components/SiteLayout.tsx"),
    read("src/pages/SkillsMarketPage.tsx"),
    read("src/data/skills.ts"),
  ]);
  assert.match(app, /SkillsMarketPage/);
  assert.match(app, /page === "skills"/);
  assert.match(layout, /Skills market/);
  assert.match(page, /The problem/);
  assert.match(page, /The solution/);
  assert.match(page, /Short simulation/);
  assert.match(page, /Use the real skill/);
  assert.match(page, /design-planning-scout\.png/);
  assert.match(page, /Design Planning asks/);
  assert.match(page, /Design Planning delivers/);
  assert.match(page, /step\.question/);
  assert.match(page, /step\.deliverableSections/);
  assert.match(page, /scrollIntoView/);
  assert.match(page, /prefers-reduced-motion/);
  assert.match(page, /Good agent work should make judgment easier to inspect/);
  assert.match(page, /decisions you can review and implement with your builder agent/);
  assert.doesNotMatch(page, /href="#design-planning"/);
  assert.doesNotMatch(page, /One skill available now/);
  assert.match(page, /navigator\.clipboard\.writeText/);
  assert.match(page, /Finished-looking work can conceal unfinished thinking/);
  assert.match(data, /https:\/\/github\.com\/mike-tag\/shared-agent-skills/);
  assert.match(data, /codex plugin marketplace add mike-tag\/shared-agent-skills/);
  assert.match(data, /\/plugin marketplace add mike-tag\/shared-agent-skills/);
  assert.match(data, /plan-design-decisions/);
  assert.equal((data.match(/question: "/g) || []).length, 4);
  assert.equal((data.match(/label: "(?:Inspect|Clarify|Compare|Validate|Output)"/g) || []).length, 5);
  assert.match(data, /Review and refine the plan, then hand it to your builder agent to implement/);
  assert.doesNotMatch(`${page}\n${data}`, /fetch\s*\(|api\.openai\.com|OPENAI_API_KEY/);
});

test("the transformation page uses four readable type tiers", async () => {
  const styles = await read("src/styles.css");
  for (const tier of ["display", "section", "body", "label"]) {
    assert.match(styles, new RegExp(`--tf-type-${tier}:`));
  }
  assert.match(styles, /\.transformation-page \* \{\s*font-size: var\(--tf-type-body\) !important;/);
});

test("the Advocacy landing page is a hiring-manager case study that protects the working MVP", async () => {
  const advocacy = await read("src/pages/AdvocacyCaseStudyPage.tsx");
  const app = await read("src/App.tsx");
  const workbench = await read("src/pages/WorkbenchPage.tsx");
  assert.match(app, /AdvocacyCaseStudyPage/);
  assert.match(advocacy, /Volunteers know why they care/);
  assert.match(advocacy, /Personal ChatGPT workflow/);
  assert.match(advocacy, /Structured advocacy workbench/);
  assert.match(advocacy, /Volunteer-ready handoff/);
  assert.match(advocacy, /Product strategy, research synthesis, workflow design, UX direction, and agent-assisted prototyping with Codex/);
  assert.match(advocacy, /Values before mechanics/);
  assert.match(advocacy, /Evidence discipline/);
  assert.match(advocacy, /Human ownership/);
  assert.match(advocacy, /href="#\/sources"/);
  assert.match(advocacy, /href="#\/method"/);
  assert.match(advocacy, /href="#\/workbench"/);
  assert.match(advocacy, /independent pilot and portfolio case study/);
  for (const label of ["Your assignment", "Audience + story", "Message + evidence", "Use your prompt"]) {
    assert.match(workbench, new RegExp(label.replace("+", "\\+")));
  }
});

test("portfolio changes are logged separately from volunteer MVP work", async () => {
  const log = await read("docs/advocacy-portfolio-change-log.md");
  assert.match(log, /Protected MVP boundary/);
  assert.match(log, /Audience served: portfolio/);
  assert.match(log, /MVP impact: none/);
  assert.match(log, /separate volunteer landing page/);
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
  assert.match(packet, /Refresh needed/);
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
  const [advocacy, workbench, sources, method, examples, about, layout, valueIcons] = await Promise.all([
    read("src/pages/AdvocacyCaseStudyPage.tsx"),
    read("src/pages/WorkbenchPage.tsx"),
    read("src/pages/SourcesPage.tsx"),
    read("src/pages/MethodPage.tsx"),
    read("src/pages/ExamplesPage.tsx"),
    read("src/pages/AboutPage.tsx"),
    read("src/components/SiteLayout.tsx"),
    read("src/components/ValueIcon.tsx"),
  ]);
  assert.match(advocacy, /HeartHandshake/);
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
