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
    title: "The handoff keeps the communicator in control.",
    description: "A sourced prompt, preserved caveats, fact-check list, and explicit human review make the output ready to inspect—not ready to send.",
    Icon: ClipboardCheck,
  },
];

const productDecisions = [
  {
    title: "Start with shared values and a clear purpose.",
    description: "In the advocacy example, VAV values—service, voter voice, trust, authentic stories, common ground, accountability, and practical action—shape the message.",
    Icon: HeartHandshake,
  },
  {
    title: "Separate public facts from strategic judgment.",
    description: "The workbench distinguishes what is known about an audience from a communicator's interpretation of what may resonate.",
    Icon: UsersRound,
  },
  {
    title: "Carry the conditions with every claim.",
    description: "In this pilot, evidence retains its source locator, best use, caveat, reform type, and verification status instead of becoming an unqualified promise.",
    Icon: BookOpenCheck,
  },
  {
    title: "Make human review part of the product.",
    description: "The person communicating owns the story, checks every fact, and approves the final message.",
    Icon: UserRoundCheck,
  },
];

export function AdvocacyCaseStudyPage() {
  return (
    <div className="avcase-page">
      <section className="avcase-hero" aria-labelledby="avcase-title">
        <div className="avcase-hero-copy">
          <h1 id="avcase-title">I make communication easier.</h1>
          <p>I built a communications workbench model that guides people from a goal, an audience, and evidence to a draft they can review. The Advocacy Workbench is the working example: a testimony workflow that brings personal stories and qualified sources together.</p>
          <div className="avcase-hero-actions">
            <button
              className="avcase-primary-action"
              type="button"
              onClick={() => document.getElementById("advocacy-structure")?.scrollIntoView()}
            >
              See how I designed the workflow
              <ArrowDown aria-hidden="true" size={18} />
            </button>
            <a className="avcase-secondary-action" href="#/workbench">
              Try the advocacy example
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
          <h2 id="avcase-proof-title">Advocacy is the working example.</h2>
          <p>The model connects a communication goal, audience context, message, supporting evidence, and human review. Try the open primaries playbook to prepare a testimony prompt.</p>
          <a className="avcase-primary-action avcase-proof-action" href="#/workbench">
            Try the advocacy example
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
