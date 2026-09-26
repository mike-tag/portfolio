import { ArrowRight, FileCheck2, Lightbulb, ShieldAlert } from "lucide-react";
import { evidenceClaims, getEvidenceSourcesForClaim } from "../data/content";

export function MethodPage() {
  const evidenceExample = evidenceClaims.find((item) => item.id === "design_specific_turnout") ?? evidenceClaims[0];
  const sources = getEvidenceSourcesForClaim(evidenceExample);

  return (
    <section className="adv-depth-page adv-method-page">
      <header className="adv-depth-header">
        <div>
          <h1>Two decisions keep a communication prompt honest.</h1>
          <p>The workbench separates public facts from strategic interpretation and keeps every evidence limitation attached to the claim it qualifies.</p>
        </div>
        <a className="button button-primary" href="#/workbench">Walk through the NYC example <ArrowRight aria-hidden="true" size={18} /></a>
      </header>

      <section className="adv-method-example" aria-labelledby="audience-judgment-title">
        <header>
          <h2 id="audience-judgment-title">Use facts to understand the audience without pretending strategy is a fact.</h2>
          <p>Both fields travel into the final packet, but they remain visibly different kinds of information.</p>
        </header>
        <div className="adv-method-pair">
          <article>
            <FileCheck2 aria-hidden="true" size={22} />
            <h3>Known public fact</h3>
            <p>The commission emphasizes effective government and outcomes for working people.</p>
          </article>
          <article>
            <Lightbulb aria-hidden="true" size={22} />
            <h3>Strategic judgment</h3>
            <p>Lead with legitimacy, service delivery, and public mandate—not exclusion alone.</p>
          </article>
        </div>
      </section>

      <section className="adv-method-example" aria-labelledby="claim-caveat-title">
        <header>
          <h2 id="claim-caveat-title">A useful claim carries its limitation into the draft.</h2>
          <p>The writer sees what the evidence can support and what it cannot promise before generating public-facing copy.</p>
        </header>
        <article className="adv-method-claim">
          <h3>{evidenceExample.title}</h3>
          <p>{evidenceExample.claim}</p>
          <div><ShieldAlert aria-hidden="true" size={20} /><p><strong>Keep in mind:</strong> {evidenceExample.caveat}</p></div>
          <details>
            <summary>Review the source basis</summary>
            <dl>
              <div><dt>Best use</dt><dd>{evidenceExample.bestUse}</dd></div>
              <div><dt>Reform type</dt><dd>{evidenceExample.reformType}</dd></div>
            </dl>
            {sources.map((source) => <p key={source.id}><cite>{source.title}</cite> — {source.locator}</p>)}
          </details>
        </article>
      </section>

      <nav className="adv-depth-links" aria-label="More Advocacy Workbench detail">
        <a href="#/sources">Inspect every evidence record</a>
        <a href="#/examples">See the method in testimony</a>
        <a href="#/about">Review the pilot boundaries</a>
      </nav>
    </section>
  );
}
