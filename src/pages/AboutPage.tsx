import { ArrowRight, CircleSlash2, ClipboardCheck, Laptop, ListChecks } from "lucide-react";

export function AboutPage() {
  return (
    <section className="adv-depth-page adv-about-page">
      <header className="adv-depth-header">
        <div>
          <h1>What this independent pilot proves—and what it does not.</h1>
          <p>This pilot applies a communications workbench model to open primaries advocacy: connecting purpose, audience, evidence, and human review. It is not an official Veterans for All Voters production service.</p>
        </div>
        <a className="button button-primary" href="#/workbench">Try the pilot <ArrowRight aria-hidden="true" size={18} /></a>
      </header>

      <div className="adv-boundary-grid">
        <article>
          <ListChecks aria-hidden="true" size={26} />
          <h2>The pilot makes preparation repeatable.</h2>
          <p>It guides an advocate through the assignment, audience, personal story, values, evidence, drafting prompt, and final human review.</p>
        </article>
        <article>
          <CircleSlash2 aria-hidden="true" size={26} />
          <h2>It does not automate persuasion or judgment.</h2>
          <p>Fact-checking, relationships, local knowledge, message choices, and final approval remain the advocate’s responsibility.</p>
        </article>
        <article>
          <Laptop aria-hidden="true" size={26} />
          <h2>Your work stays in the current browser session.</h2>
          <p>The static pilot has no accounts, analytics, backend, or AI connection and makes no network calls.</p>
        </article>
      </div>

      <section className="adv-next-validation">
        <ClipboardCheck aria-hidden="true" size={28} />
        <div>
          <h2>The next proof is volunteer testing.</h2>
          <p>Measure time to a useful first draft, message consistency, evidence completeness, usability, and reviewer burden before expanding to more issue playbooks.</p>
        </div>
      </section>

      <nav className="adv-depth-links" aria-label="More Advocacy Workbench detail">
        <a href="#/advocacy">Return to the case study</a>
        <a href="#/sources">Inspect the evidence system</a>
        <a href="#/method">See the design method</a>
      </nav>
    </section>
  );
}
