import {
  ArrowDown,
  ArrowRight,
  BookOpenCheck,
  ClipboardCheck,
  FileText,
  HeartHandshake,
  LayoutTemplate,
  Route,
  Sparkles,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";

const workflowStages = [
  {
    number: "01",
    title: "Personal ChatGPT workflow",
    description: "Source collection, audience analysis, message framing, and iterative drafting lived in one project workspace.",
    Icon: FileText,
  },
  {
    number: "02",
    title: "Structured advocacy workbench",
    description: "The repeatable decisions became four guided steps: assignment, audience and story, message and evidence, then handoff.",
    Icon: LayoutTemplate,
  },
  {
    number: "03",
    title: "Volunteer-ready handoff",
    description: "The user gets a sourced AI prompt, preserved caveats, a fact-check list, and an explicit human review before use.",
    Icon: ClipboardCheck,
  },
];

const productDecisions = [
  {
    title: "Values before mechanics",
    description: "Service, voter voice, trust, common ground, and authentic stories shape the message before policy detail does.",
    Icon: HeartHandshake,
  },
  {
    title: "Audience context",
    description: "Known public facts stay distinct from strategic judgment about what may matter to a decision-maker.",
    Icon: UsersRound,
  },
  {
    title: "Evidence discipline",
    description: "Claims carry their underlying source, locator, best use, caveat, reform type, and verification status.",
    Icon: BookOpenCheck,
  },
  {
    title: "Human ownership",
    description: "The volunteer integrates their story, checks every fact, and makes the final decision about what to present.",
    Icon: UserRoundCheck,
  },
];

export function AdvocacyCaseStudyPage() {
  return (
    <div className="advocacy-case-study">
      <section className="acs-hero section-pad">
        <div className="acs-hero-copy">
          <h1>Volunteers know why they care. Turning that conviction into a clear, evidence-backed message is harder.</h1>
          <p className="acs-hero-lead">I turned a repeatable advocacy workflow I had developed in ChatGPT into a guided tool another advocate can use.</p>
          <a className="acs-text-link" href="#advocacy-workflow">See the workflow transformation <ArrowDown aria-hidden="true" size={18} /></a>
        </div>

        <figure className="acs-hero-visual">
          <img src="./volunteer-advocate.png" alt="Illustration of a veteran volunteer preparing notes at a public hearing microphone" />
          <figcaption>This is an independent pilot and portfolio case study—not an official Veterans for All Voters production service.</figcaption>
        </figure>
      </section>

      <section className="acs-workflow section-pad" id="advocacy-workflow" aria-labelledby="workflow-heading">
        <header className="acs-section-heading">
          <h2 id="workflow-heading">A repeatable structure turns a personal process into a product another advocate can use.</h2>
        </header>

        <ol className="acs-workflow-stages">
          {workflowStages.map(({ number, title, description, Icon }, index) => (
            <li key={title}>
              <span className="acs-stage-number">{number}</span>
              <span className="acs-stage-icon"><Icon aria-hidden="true" size={27} strokeWidth={1.65} /></span>
              <h3>{title}</h3>
              <p>{description}</p>
              {index < workflowStages.length - 1 && <span className="acs-stage-arrow" aria-hidden="true"><ArrowRight size={22} strokeWidth={1.8} /></span>}
            </li>
          ))}
        </ol>
      </section>

      <section className="acs-decisions section-pad" aria-labelledby="decisions-heading">
        <header className="acs-section-heading">
          <h2 id="decisions-heading">The product is the structure around the prompt.</h2>
        </header>

        <div className="acs-decisions-layout">
          <div className="acs-decision-grid">
            {productDecisions.map(({ title, description, Icon }) => (
              <article key={title}>
                <span><Icon aria-hidden="true" size={24} strokeWidth={1.7} /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>

          <aside className="acs-role-card">
            <h2>My contribution: Turning the workflow into a usable system.</h2>
            <p>Product strategy, research synthesis, workflow design, UX direction, and agent-assisted prototyping with Codex.</p>
            <dl>
              <div><dt>Kept human</dt><dd>Message judgment, personal story, factual verification, and final approval</dd></div>
              <div><dt>Made repeatable</dt><dd>Audience framing, value selection, evidence handling, prompt construction, and review</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="acs-inspect section-pad" aria-labelledby="inspect-heading">
        <div>
          <h2 id="inspect-heading">Review how the system handles evidence and human judgment, then try the tool.</h2>
        </div>
        <nav className="acs-inspect-actions" aria-label="Advocacy case study paths">
          <a className="acs-action-card" href="#/sources"><BookOpenCheck aria-hidden="true" size={24} /><strong>Review the evidence</strong><ArrowRight aria-hidden="true" size={20} /></a>
          <a className="acs-action-card" href="#/method"><Route aria-hidden="true" size={24} /><strong>See the design method</strong><ArrowRight aria-hidden="true" size={20} /></a>
          <a className="acs-action-card acs-action-card-secondary" href="#/workbench"><Sparkles aria-hidden="true" size={24} /><strong>Explore the workbench</strong><ArrowRight aria-hidden="true" size={20} /></a>
        </nav>
      </section>
    </div>
  );
}
