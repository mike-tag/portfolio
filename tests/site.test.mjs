import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const readBuffer = (path) => readFile(new URL(`../${path}`, import.meta.url));

test("production output is GitHub Pages safe", async () => {
  const html = await read("dist/index.html");
  assert.match(html, /<title>Mike Tagariello \| AI transformation portfolio<\/title>/);
  assert.match(html, /(?:src|href)="\.\/assets\//);
  assert.doesNotMatch(html, /OPENAI_API_KEY/);
});

test("link-sharing metadata is production-ready", async () => {
  const html = await read("dist/index.html");
  const previewImage = await readBuffer("public/mike-tagariello-portfolio-preview.png");
  const previewUrl = "https://mike-tag.github.io/portfolio/mike-tagariello-portfolio-preview.png";
  assert.equal(previewImage.readUInt32BE(16), 1200);
  assert.equal(previewImage.readUInt32BE(20), 630);
  assert.match(html, /<link rel="canonical" href="https:\/\/mike-tag\.github\.io\/portfolio\/"/);
  assert.match(html, /<meta[\s\S]*name="description"[\s\S]*content="Selected work by Mike Tagariello in AI transformation, reusable agent skills, and evidence-led advocacy\."/);
  assert.match(html, /<meta property="og:url" content="https:\/\/mike-tag\.github\.io\/portfolio\/"/);
  assert.match(html, /<meta property="og:title" content="Mike Tagariello \| AI transformation portfolio"/);
  assert.match(html, /<meta property="og:description" content="Selected public work in transformation systems, reusable agent skills, and evidence-led advocacy\."/);
  assert.match(html, new RegExp(`<meta property="og:image" content="${previewUrl.replace(/[/.]/g, "\\$&")}"`));
  assert.match(html, /<meta property="og:image:width" content="1200"/);
  assert.match(html, /<meta property="og:image:height" content="630"/);
  assert.match(html, /<meta property="og:image:alt" content="Mike Tagariello portfolio preview/);
  assert.match(html, /<meta name="twitter:card" content="summary_large_image"/);
  assert.match(html, new RegExp(`<meta name="twitter:image" content="${previewUrl.replace(/[/.]/g, "\\$&")}"`));
  assert.doesNotMatch(html, /content="\.\/og-/);
});

test("visible interface copy uses sentence case without eyebrow tiers", async () => {
  const [styles, redesign, advocacy, transformation, skills, about, sources, method, examples, workbench, layout] = await Promise.all([
    read("src/styles.css"),
    read("src/redesign.css"),
    read("src/pages/AdvocacyCaseStudyPage.tsx"),
    read("src/pages/TransformationPage.tsx"),
    read("src/pages/SkillsMarketPage.tsx"),
    read("src/pages/AboutPage.tsx"),
    read("src/pages/SourcesPage.tsx"),
    read("src/pages/MethodPage.tsx"),
    read("src/pages/ExamplesPage.tsx"),
    read("src/pages/WorkbenchPage.tsx"),
    read("src/components/SiteLayout.tsx"),
  ]);
  assert.doesNotMatch(`${styles}\n${redesign}`, /text-transform:\s*uppercase/);
  const pages = [advocacy, transformation, skills, about, sources, method, examples, workbench, layout].join("\n");
  assert.doesNotMatch(pages, /className="[^"]*(?:eyebrow|kicker|document-label|source-category|approach-choice)/);
  assert.doesNotMatch(pages, />The problem<|>The solution<|>Our approach<|>The outcome</);
});

test("the route hierarchy separates the portfolio from Advocacy product depth", async () => {
  const [app, routes, layout] = await Promise.all([
    read("src/App.tsx"),
    read("src/routes.ts"),
    read("src/components/SiteLayout.tsx"),
  ]);
  assert.match(app, /routeDefinitions\[page\]\.title/);
  assert.match(app, /pageIds/);
  assert.equal((routes.match(/surface: "portfolio-case"/g) || []).length, 3);
  assert.equal((routes.match(/surface: "advocacy-product"/g) || []).length, 5);
  assert.match(layout, /Portfolio home/);
  for (const [level, project] of [["Organization", "Role redesign"], ["Workflow", "Advocacy Workbench"], ["Task", "Design Planning"]]) {
    assert.match(layout, new RegExp(`level: "${level}", project: "${project}"`));
  }
  for (const label of ["Role redesign", "Usable workflows", "Reusable expertise"]) {
    assert.match(routes, new RegExp(`projectLabel: "${label}"`));
  }
  const roleIndex = layout.indexOf('id: "transformation", level: "Organization"');
  const workflowIndex = layout.indexOf('id: "advocacy", level: "Workflow"');
  const expertiseIndex = layout.indexOf('id: "skills", level: "Task"');
  assert.ok(roleIndex < workflowIndex && workflowIndex < expertiseIndex, "portfolio links should tell the role, workflow, expertise story in order");
  const advocacyNav = layout.match(/const advocacyNavItems[\s\S]*?\];/)?.[0] ?? "";
  assert.equal((advocacyNav.match(/id: "/g) || []).length, 3);
  for (const label of ["Case study", "Try the workbench", "Evidence"]) assert.match(advocacyNav, new RegExp(`label: "${label}"`));
  assert.doesNotMatch(advocacyNav, /Method|Examples|About/);
  assert.match(layout, /route\.surface === "portfolio-case"/);
  assert.match(layout, /route\.surface === "advocacy-product"/);
  assert.match(layout, /className="footer-profile"/);
  assert.match(layout, /className="brand-mark portfolio-profile-mark"/);
  assert.match(layout, /mike-tagariello-headshot-illustrated\.png/);
  assert.match(layout, /<img src="\.\/mike-tagariello-headshot-illustrated\.png" alt=""/);
  assert.doesNotMatch(layout, /MikeSigil/);
});

test("portfolio proofs and case-study titles share consistent headline scales", async () => {
  const [homeStyles, layoutStyles, transformationStyles, advocacyStyles, skillsStyles] = await Promise.all([
    read("src/styles.css"),
    read("src/components/site-layout.css"),
    read("src/pages/TransformationPage.css"),
    read("src/pages/AdvocacyCaseStudyPage.css"),
    read("src/pages/SkillsMarketPage.css"),
  ]);
  assert.match(homeStyles, /--portfolio-proof-title-size:\s*clamp\(2\.2rem, 3\.6vw, 4rem\)/);
  assert.match(homeStyles, /\.portfolio-work \.experience-card h3[\s\S]*?font-size:\s*var\(--portfolio-proof-title-size\)/);
  assert.doesNotMatch(homeStyles, /experience-card-(?:advocacy|skills) h3\s*\{[^}]*font-size/);
  assert.match(layoutStyles, /--portfolio-case-title-size:\s*clamp\(3rem, 5\.6vw, 5\.8rem\)/);
  for (const styles of [transformationStyles, advocacyStyles, skillsStyles]) {
    assert.equal((styles.match(/font-size:\s*var\(--portfolio-case-title-size\)/g) || []).length, 1);
  }
});

test("portfolio navigation uses a panel state instead of underlines", async () => {
  const styles = await read("src/components/site-layout.css");
  assert.match(styles, /\.portfolio-case-nav a[\s\S]*?text-decoration:\s*none/);
  assert.match(styles, /\.portfolio-case-nav a\[aria-current="page"\][\s\S]*?border-color:[\s\S]*?background:/);
  assert.doesNotMatch(styles, /a\[aria-current="page"\]::after/);
});

test("hash navigation opens each route at the top of the page", async () => {
  const [app, styles] = await Promise.all([read("src/App.tsx"), read("src/styles.css")]);
  assert.match(app, /window\.scrollTo\(0, 0\)/);
  assert.match(app, /document\.documentElement\.scrollTop = 0/);
  assert.match(app, /document\.body\.scrollTop = 0/);
  assert.match(app, /window\.requestAnimationFrame\(resetScroll\)/);
  assert.match(app, /heading\?\.focus\(\{ preventScroll: true \}\)/);
  assert.match(styles, /html\s*\{\s*scroll-behavior:\s*auto/);
});

test("the front page routes each hiring need to focused proof and next actions", async () => {
  const [app, chooser, actions, closing] = await Promise.all([
    read("src/App.tsx"),
    read("src/pages/ExperiencePage.tsx"),
    read("src/components/PortfolioActions.tsx"),
    read("src/components/PortfolioCaseClosing.tsx"),
  ]);
  assert.match(app, /TransformationPage/);
  assert.match(app, /SkillsMarketPage/);
  assert.match(app, /AdvocacyCaseStudyPage/);
  assert.match(app, /ExperiencePage/);
  assert.match(chooser, /I need to turn AI potential into a practical role redesign/);
  assert.match(chooser, /I need to make a clear 60-second case for voter reform/);
  assert.match(chooser, /I turn AI capabilities into better work and lasting value/);
  assert.match(chooser, /mike-tagariello-headshot-illustrated\.png/);
  assert.doesNotMatch(chooser, /Professional headshot forthcoming/);
  assert.match(chooser, /lead adoption and value measurement from objectives to impact/);
  assert.match(chooser, /align senior leaders/);
  assert.match(chooser, /redesign workflows with the people doing the work/);
  assert.match(chooser, /<strong>10\+<\/strong><span>Years making technology work for people/);
  assert.match(chooser, /<strong>10<\/strong><span>Clients helped with AI in three years/);
  assert.match(chooser, /<strong>50k\+<\/strong><span>People reached in just one project/);
  assert.match(chooser, /U\.S\. Air Force veteran/);
  assert.match(chooser, /Columbia University graduate/);
  assert.match(chooser, /href: "#\/transformation"/);
  assert.match(chooser, /href: "#\/advocacy"/);
  assert.match(chooser, /href: "#\/skills"/);
  assert.match(chooser, /How I work with AI/);
  for (const level of ["Organization", "Workflow", "Task"]) assert.match(chooser, new RegExp(level));
  assert.match(chooser, /Three independent levels of AI integration/);
  const depthMap = chooser.match(/const portfolioDepth = \[[\s\S]*?\];/)?.[0] ?? "";
  assert.doesNotMatch(depthMap, /project:/);
  for (const detail of ["Align people, roles, and governance", "Redesign how work gets done", "Make expert methods reusable"]) {
    assert.match(depthMap, new RegExp(detail));
  }
  assert.match(chooser, /Explore and install skills/);
  assert.match(chooser, /I need an AI collaborator that understands design principles and leaves me with a usable plan/);
  assert.match(actions, /https:\/\/www\.linkedin\.com\/in\/miketagariello\//);
  assert.match(actions, /Connect with Mike on LinkedIn/);
  assert.match(actions, /\.\/mike-tagariello-resume\.pdf/);
  assert.match(actions, /download="Mike-Tagariello-Resume\.pdf"/);
  assert.match(actions, /Download resume/);
  assert.match(closing, /PortfolioActions/);
});

test("the transformation case shows one proof, one walkthrough, and optional depth", async () => {
  const [page, data, css] = await Promise.all([
    read("src/pages/TransformationPage.tsx"),
    read("src/data/transformation.ts"),
    read("src/pages/TransformationPage.css"),
  ]);
  assert.match(page, /AI transformation starts with redesigning how work gets done/);
  assert.doesNotMatch(page, /Choose your lens/);
  assert.match(page, /From role intake to governed pilots/);
  assert.match(page, /The Transformation Factory does this across roles throughout an organization/);
  assert.match(page, /Four stages turn a role's work into governed process pilots/);
  for (const stage of ["Validate the work", "Map the decisions", "Redesign the role", "Plan role pilots"]) {
    assert.match(page, new RegExp(stage));
  }
  assert.match(page, /Each role can produce one process pilot or a portfolio of pilots/);
  assert.match(page, /Start with evidence about the work, not an automation verdict/);
  assert.match(page, /Automation readiness/);
  assert.match(page, /O-ring disruption/);
  assert.match(page, /Bottleneck/);
  assert.match(page, /Complementarity/);
  assert.match(page, /Bundle dependence/);
  assert.match(page, /Required control/);
  assert.match(page, /Validation status/);
  assert.match(page, /Inspect the assumptions behind the recommendation/);
  assert.ok((page.match(/<details/g) || []).length >= 5);
  for (const exposureClass of ["E0", "E1", "E2"]) assert.match(page, new RegExp(`<strong>${exposureClass}<\\/strong>`));
  assert.match(page, /The governance gates people must own/);
  assert.match(page, /Mike made the transformation judgment inspectable/);
  assert.match(page, /PortfolioCaseClosing/);
  assert.match(css, /\.cr-case-page/);
  assert.match(css, /\.cr-case-page \.cr-case-button\s*\{[\s\S]*?color:\s*var\(--cr-bg\)/);
  assert.doesNotMatch(css, /font-size:[^;]+!important/);
  assert.match(data, /Illustrative composite job posting/);
  for (const field of ["exposureAssessment", "oRingJudgment", "requiredControl", "validationStatus"]) assert.match(data, new RegExp(field));
  for (const state of ["Automate", "Accelerate", "Copilot", "Human-control", "Human-only"]) assert.match(data, new RegExp(state));
  assert.doesNotMatch(`${page}\n${data}`, /fetch\s*\(|api\.openai\.com|OPENAI_API_KEY/);
});

test("the skills page stays an expandable collection with a three-moment demonstration", async () => {
  const [page, data, css] = await Promise.all([
    read("src/pages/SkillsMarketPage.tsx"),
    read("src/data/skills.ts"),
    read("src/pages/SkillsMarketPage.css"),
  ]);
  assert.match(page, /I turn task-level expertise into reusable AI skills/);
  assert.match(page, /How expertise becomes a shared skill/);
  for (const stage of ["Find the judgment", "Encode the method", "Publish the skill", "Learn through reuse"]) assert.match(page, new RegExp(stage));
  assert.match(page, /<figure className="skills-collection-lifecycle">/);
  assert.match(page, /Research credit/);
  assert.match(page, /Tom Greever/);
  assert.match(page, /Articulating Design Decisions/);
  assert.match(page, /https:\/\/tomgreever\.com\/resources\//);
  assert.match(page, /The skill is open source, MIT licensed/);
  assert.match(page, /skills-collection-repository-note/);
  assert.match(page, /marketSkills\.map/);
  assert.match(page, /View on GitHub/);
  assert.match(page, /It turns premature production into decisions a team can inspect/);
  assert.match(page, /Three moments make the judgment visible/);
  assert.match(page, /step\.findings/);
  assert.match(page, /step\.choices/);
  assert.match(page, /choice\.tradeoff/);
  assert.match(page, /Skill recommends/);
  assert.match(page, /Choose a direction to continue/);
  assert.match(page, /step\.confirmation/);
  assert.match(page, /step\.conversation/);
  assert.match(page, /Representative conversation between the Design Planning skill and a product owner/);
  assert.match(page, /step\.deliverableSections/);
  assert.match(page, /<details className="skills-collection-install">/);
  assert.match(page, /Install \{skill\.name\} in Codex or Claude Code/);
  assert.match(page, /navigator\.clipboard\.writeText/);
  assert.match(page, /PortfolioCaseClosing/);
  assert.doesNotMatch(page, /The problem|The solution|Short simulation|Use the real skill|Scout/);
  assert.match(css, /\.skills-collection-page/);
  assert.match(css, /text-wrap: balance/);
  assert.match(data, /https:\/\/github\.com\/mike-tag\/shared-agent-skills/);
  assert.match(data, /codex plugin marketplace add mike-tag\/shared-agent-skills/);
  assert.match(data, /\/plugin marketplace add mike-tag\/shared-agent-skills/);
  assert.match(data, /plan-design-decisions/);
  assert.equal((data.match(/label: "(?:Inspect context|Recommend a direction|Deliver the plan)"/g) || []).length, 3);
  for (const kind of ["inspection", "recommendation", "output"]) assert.match(data, new RegExp(`kind: "${kind}"`));
  assert.equal((data.match(/speaker: "(?:skill|product-owner)",/g) || []).length, 3);
  assert.equal((data.match(/id: "(?:guided-path|flexible-dashboard|checklist-hub)"/g) || []).length, 3);
  assert.match(data, /recommended: true/);
  assert.match(data, /Recommendations \+ rationale \+ tradeoffs/);
  assert.match(data, /Take the written plan into Codex, Claude Code, or another builder agent and execute it/);
  assert.doesNotMatch(`${page}\n${data}`, /fetch\s*\(|api\.openai\.com|OPENAI_API_KEY/);
});

test("the Advocacy landing page is a hiring-manager case study that protects the working MVP", async () => {
  const advocacy = await read("src/pages/AdvocacyCaseStudyPage.tsx");
  const app = await read("src/App.tsx");
  const workbench = await read("src/pages/WorkbenchPage.tsx");
  assert.match(app, /AdvocacyCaseStudyPage/);
  assert.match(advocacy, /I turn judgment-heavy workflows into usable systems/);
  assert.match(advocacy, /Read the case study/);
  assert.match(advocacy, /Jump to the working prototype/);
  assert.doesNotMatch(advocacy, /See what I changed/);
  assert.match(advocacy, /Explore the working prototype/);
  assert.match(advocacy, /A repeatable structure makes the work transferable/);
  assert.equal((advocacy.match(/title: "/g) || []).length, 7);
  assert.match(advocacy, /Product strategy, research synthesis, workflow design, UX direction, and agent-assisted prototyping with Codex/);
  assert.match(advocacy, /I designed the judgment around the prompt, not just the prompt/);
  assert.match(advocacy, /The workbench is the proof/);
  assert.match(advocacy, /href="#\/sources"/);
  assert.match(advocacy, /href="#\/method"/);
  assert.match(advocacy, /href="#\/examples"/);
  assert.match(advocacy, /href="#\/workbench"/);
  assert.match(advocacy, /independent pilot and portfolio case study/);
  assert.match(advocacy, /PortfolioCaseClosing/);
  for (const label of ["Your assignment", "Audience + story", "Message + evidence", "Use your prompt"]) {
    assert.match(workbench, new RegExp(label.replace("+", "\\+")));
  }
});

test("portfolio changes are logged separately from volunteer MVP work", async () => {
  const [log, decisions] = await Promise.all([
    read("docs/advocacy-portfolio-change-log.md"),
    read("docs/portfolio-subpage-design-decisions.md"),
  ]);
  assert.match(log, /Protected MVP boundary/);
  assert.match(log, /Audience served: portfolio/);
  assert.match(log, /MVP impact: none/);
  assert.match(log, /separate volunteer landing page/);
  assert.match(decisions, /Hiring decision-makers/);
  assert.match(decisions, /progressive disclosure/i);
  assert.match(decisions, /shared portfolio frame/i);
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

test("Advocacy support pages keep essential meaning visible and technical depth optional", async () => {
  const [sources, method, about] = await Promise.all([
    read("src/pages/SourcesPage.tsx"),
    read("src/pages/MethodPage.tsx"),
    read("src/pages/AboutPage.tsx"),
  ]);
  assert.match(sources, /Inspect the evidence behind the workbench/);
  assert.match(sources, /<details className="adv-evidence-record"/);
  for (const field of ["Best use", "Reform type", "Verification", "Underlying publications"]) {
    assert.match(sources, new RegExp(field));
  }
  assert.match(sources, /source\.locator/);
  assert.match(method, /Two decisions keep an advocacy prompt honest/);
  assert.match(method, /Known public fact/);
  assert.match(method, /Strategic judgment/);
  assert.match(method, /A useful claim carries its limitation into the draft/);
  assert.match(method, /<summary>Review the source basis<\/summary>/);
  assert.match(about, /What this independent pilot proves/);
  assert.match(about, /It does not automate persuasion or judgment/);
  assert.match(about, /The next proof is volunteer testing/);
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
  assert.match(workbench, /Copy the complete packet into the AI writing tool you use/);
  assert.match(workbench, /Copy work packet/);
  assert.doesNotMatch(workbench, /handoff-steps|packet-summary-grid/);
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
