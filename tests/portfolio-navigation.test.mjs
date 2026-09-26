import test from "node:test";
import assert from "node:assert/strict";
import { nextPortfolioWork, portfolioHref, portfolioLocation, portfolioOverviewTarget, portfolioSections, workbenchPages } from "../src/data/portfolio.ts";

test("portfolio links stay inside the deployed project from either app", () => {
  const root = "https://example.org/portfolio/";
  const demo = `${root}integration-agents/index.html`;
  const expected = {
    home: root + "#/", work: root + "#/?section=work",
    reinvent: root + "#/?section=reinvent", build: root + "#/?section=build", people: root + "#/?section=people",
    transformation: root + "#/transformation", "enterprise-build": root + "#/enterprise-build",
    feasibility: demo + "#/feasibility", integration: demo + "#/integration",
    advocacy: root + "#/advocacy", skills: root + "#/skills", workbench: root + "#/workbench",
    sources: root + "#/sources", examples: root + "#/examples", method: root + "#/method", about: root + "#/about",
  };
  for (const [id, target] of Object.entries(expected)) {
    assert.equal(new URL(portfolioHref(id), root).href, target, id);
    assert.equal(new URL(portfolioHref(id, true), demo).href, target, `demo → ${id}`);
  }
});

test("each proof has one section and the suggested path covers all six without a loop", () => {
  const ids = portfolioSections.flatMap(section => section.pages.map(page => page.id));
  assert.equal(new Set(ids).size, 6);
  const visited = [];
  let page = "transformation";
  while (page && visited.length < 7) {
    visited.push(page);
    assert.ok(portfolioLocation(page).section);
    page = nextPortfolioWork(page)?.id;
  }
  assert.deepEqual(visited, ids);
  assert.equal(nextPortfolioWork("workbench"), undefined);
});

test("supporting tools lead back to the advocacy case without entering the proof sequence", () => {
  for (const page of workbenchPages) {
    const location = portfolioLocation(page.id);
    assert.equal(location.section.id, "people");
    assert.equal(location.proof.id, "advocacy");
    assert.equal(location.toolPage.id, page.id);
  }
  assert.equal(portfolioLocation("advocacy").toolPage, undefined);
  assert.equal(portfolioLocation("the-build").section, undefined);
});

test("section deep links select a real overview target and ignore unrelated queries", () => {
  assert.deepEqual(portfolioOverviewTarget("#/?section=work"), { region: "portfolio-work", heading: "work-title" });
  for (const section of ["reinvent", "build", "people"]) {
    assert.deepEqual(portfolioOverviewTarget(`#/?section=${section}`), { region: `work-${section}`, heading: `work-${section}-title` });
  }
  for (const hash of ["#/", "#/advocacy?section=people", "#/?section=missing", "#/?section=__proto__"]) {
    assert.equal(portfolioOverviewTarget(hash), null);
  }
});
