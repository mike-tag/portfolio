import {
  ArrowDown,
  ArrowRight,
  BookOpenCheck,
  ClipboardCheck,
  FileText,
  HeartHandshake,
  LayoutTemplate,
  Sparkles,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";
import { PortfolioCaseClosing } from "../components/PortfolioCaseClosing";

const workflowStages = [
  {
    title: "The process lived in one ChatGPT project.",
    description: "Research, audience analysis, message framing, and drafting worked for me, but the judgment behind each step was implicit.",
    Icon: FileText,
  },
  {
    title: "I turned the judgment into four visible decisions.",
    description: "The workbench guides assignment, audience and story, message and evidence, then the final handoff.",
    Icon: LayoutTemplate,
  },
  {
    title: "The handoff keeps the advocate in control.",
    description: "A sourced prompt, preserved caveats, fact-check list, and explicit human review make the output ready to inspect—not ready to send.",
    Icon: ClipboardCheck,
  },
];

const productDecisions = [
  {
    title: "Start with VAV values, not policy mechanics.",
    description: "Service, voter voice, trust, authentic stories, common ground, accountability, and practical action shape the message.",
    Icon: HeartHandshake,
  },
  {
    title: "Separate public facts from strategic judgment.",
    description: "The tool distinguishes what is known about an audience from an advocate's interpretation of what may resonate.",
    Icon: UsersRound,
  },
  {
    title: "Carry the conditions with every claim.",
    description: "Evidence retains its source locator, best use, caveat, reform type, and verification status instead of becoming an unqualified promise.",
    Icon: BookOpenCheck,
  },
  {
    title: "Make human review part of the product.",
    description: "The advocate owns the personal story, checks every fact, and decides what is appropriate to present.",
    Icon: UserRoundCheck,
  },
];

export function AdvocacyCaseStudyPage() {
  return (
    <div className="avcase-page">
      <section className="avcase-hero" aria-labelledby="avcase-title">
        <div className="avcase-hero-copy">
          <h1 id="avcase-title">I turn judgment-heavy workflows into usable systems.</h1>
          <p>This case study shows how I turned an advocacy workflow—not just its final prompt—into a system that keeps values, audience context, evidence, and human judgment connected.</p>
          <div className="avcase-hero-actions">
            <button
              className="avcase-primary-action"
              type="button"
              onClick={() => document.getElementById("advocacy-structure")?.scrollIntoView()}
            >
              Read the case study
              <ArrowDown aria-hidden="true" size={18} />
            </button>
            <a className="avcase-secondary-action" href="#/workbench">
              Jump to the working prototype
              <ArrowRight aria-hidden="true" size={19} />
            </a>
          </div>
        </div>

        <figure className="avcase-hero-visual">
          <img src="./volunteer-advocate.png" alt="A veteran volunteer preparing notes at a public hearing microphone" />
          <figcaption>
            This is an independent pilot and portfolio case study, not an official Veterans for All Voters service. The static prototype creates a work packet; it does not send information or replace fact-checking.
          </figcaption>
        </figure>
      </section>

      <section className="avcase-structure" id="advocacy-structure" aria-labelledby="avcase-structure-title">
        <div className="avcase-section-heading">
          <h2 id="avcase-structure-title">A repeatable structure makes the work transferable.</h2>
        </div>

        <ol className="avcase-workflow">
          {workflowStages.map(({ title, description, Icon }, index) => (
            <li key={title}>
              <div className="avcase-workflow-marker" aria-hidden="true">
                <span>{index + 1}</span>
                <Icon size={25} strokeWidth={1.7} />
              </div>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="avcase-decisions" aria-labelledby="avcase-decisions-title">
        <div className="avcase-decisions-intro">
          <h2 id="avcase-decisions-title">I designed the judgment around the prompt, not just the prompt.</h2>
          <p><strong>My contribution:</strong> Product strategy, research synthesis, workflow design, UX direction, and agent-assisted prototyping with Codex.</p>
        </div>

        <div className="avcase-decision-list">
          {productDecisions.map(({ title, description, Icon }) => (
            <article key={title}>
              <Icon aria-hidden="true" size={24} strokeWidth={1.7} />
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="avcase-proof" aria-labelledby="avcase-proof-title">
        <div>
          <h2 id="avcase-proof-title">The workbench is the proof.</h2>
          <p>Build a sample work packet to see how values, audience context, personal story, qualified evidence, and human review stay connected.</p>
          <a className="avcase-primary-action avcase-proof-action" href="#/workbench">
            Explore the working prototype
            <Sparkles aria-hidden="true" size={19} />
          </a>
        </div>

        <p className="avcase-depth-links">
          For supporting detail, <a href="#/sources">review the evidence</a>, <a href="#/method">see the design method</a>, or <a href="#/examples">compare two testimony approaches</a>.
        </p>
      </section>

      <PortfolioCaseClosing
        heading="I turn responsible AI judgment into tools people can use."
        description="If your team needs practical transformation that keeps people in control, connect with Mike or download his resume."
      />
    </div>
  );
}
