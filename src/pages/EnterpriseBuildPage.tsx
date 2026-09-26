import { BadgeCheck, Clock3, Gauge, RefreshCw, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";

const presentationSections = [
  { id: "enterprise-build-opening", label: "The challenge" },
  { id: "enterprise-build-system", label: "The flywheel" },
  { id: "enterprise-build-select", label: "Select" },
  { id: "enterprise-build-build", label: "Build" },
  { id: "enterprise-build-prove", label: "Prove" },
  { id: "enterprise-build-certify", label: "Reuse" },
  { id: "enterprise-build-return", label: "The return" },
  { id: "enterprise-build-close", label: "Close" },
  { id: "enterprise-build-appendix", label: "Operations" },
] as const;

const presentationTrail = [
  { id: "select", number: "01", label: "Select", sectionId: "enterprise-build-select", kind: "stage" },
  { id: "build", number: "02", label: "Build", sectionId: "enterprise-build-build", kind: "stage" },
  { id: "prove", number: "03", label: "Prove", sectionId: "enterprise-build-prove", kind: "stage" },
  { id: "certify", number: "04", label: "Reuse", sectionId: "enterprise-build-certify", kind: "stage" },
  { id: "discussion", number: "", label: "Operations", sectionId: "enterprise-build-appendix", kind: "discussion" },
] as const;

type PresentationSectionId = (typeof presentationSections)[number]["id"];

const buildPaths = [
  { title: "No-code build", description: "Native capabilities and repeatable patterns" },
  { title: "Low-code build", description: "Standard APIs and predictable data" },
  { title: "Engineering-supported build", description: "Complex integrations, data, or architecture" },
  {
    title: "Full system integration",
    description: "Engineering-led implementation with a named delivery owner",
  },
];

const measurementPaths = [
  { title: "Work samples", description: "Compare completed work against agreed quality and effort measures" },
  { title: "Before-and-after survey", description: "A direct baseline and outcome comparison" },
  {
    title: "Usage analysis",
    description: "Analyze activity where data access, permissions, and privacy allow",
    note: "If using AI to classify activity, validate its labels against observed work.",
  },
];

const workflowOutcomes = [
  { label: "Time", icon: Clock3 },
  { label: "Quality", icon: BadgeCheck },
  { label: "Throughput", icon: Gauge },
  { label: "Risk", icon: ShieldAlert },
];

const reuseReadiness = [
  { title: "Measured in use", description: "Deployed in live work and measured against a defined outcome" },
  { title: "Ready to share", description: "Reviewed for reliability, controls, documentation, and ongoing support" },
  { title: "Reused elsewhere", description: "Adapted for another team with results and limitations recorded" },
];

const feedbackSignals = [
  { title: "Feasibility decisions", description: "Realistic implementation effort" },
  { title: "Build patterns", description: "Tested approaches to implementation and integration" },
  { title: "Measured outcomes", description: "Evidence of what improved and what did not" },
];

const fundingModels = [
  { title: "First deployment", description: "Select one workflow to adapt and deploy" },
  { title: "Shared solution library", description: "Reusable solutions, evidence, guidance, and updates" },
  { title: "Enterprise portfolio", description: "Multiple workflows, dedicated capacity, and a shared roadmap" },
];

const resilienceSteps = [
  {
    title: "Version",
    description: "Keep versioned instructions, model and tool configurations, integrations, and tests.",
  },
  {
    title: "Monitor",
    description: "Track usage, failures, exceptions, drift, and platform releases.",
  },
  {
    title: "Re-test",
    description: "Material changes trigger testing and evidence review.",
  },
];

function BuildFlywheel() {
  return (
    <figure className="enterprise-build-flywheel">
      <svg viewBox="0 0 1040 450" role="img" aria-labelledby="enterprise-build-flywheel-title enterprise-build-flywheel-desc">
        <title id="enterprise-build-flywheel-title">Enterprise workflow delivery cycle</title>
        <desc id="enterprise-build-flywheel-desc">
          Prioritized workflows from the work inventory enter a four-stage cycle: Select, Build, Prove, and Reuse.
          The cycle focuses on how work gets done. The output is a library of reusable solutions with published evidence.
        </desc>

        <text className="enterprise-build-flywheel__end-title" x="34" y="207">Work inventory</text>
        <text className="enterprise-build-flywheel__end-sub" x="34" y="239">Prioritized workflows</text>
        <path className="enterprise-build-flywheel__rail" d="M 34 263 H 288" />

        <circle className="enterprise-build-flywheel__track-soft" cx="520" cy="252" r="174" />
        <circle className="enterprise-build-flywheel__track" cx="520" cy="252" r="174" />
        <path className="enterprise-build-flywheel__direction" d="M 512 74 L 528 78 L 512 84 z" />
        <path className="enterprise-build-flywheel__direction" d="M 688 244 L 694 260 L 700 244 z" />
        <path className="enterprise-build-flywheel__direction" d="M 528 420 L 512 426 L 528 432 z" />
        <path className="enterprise-build-flywheel__direction" d="M 340 260 L 346 244 L 352 260 z" />

        {[
          { number: "01", label: "Select", x: 397, y: 129 },
          { number: "02", label: "Build", x: 643, y: 129 },
          { number: "03", label: "Prove", x: 643, y: 375 },
          { number: "04", label: "Reuse", x: 397, y: 375 },
        ].map((stage) => (
          <g key={stage.number}>
            <circle className="enterprise-build-flywheel__node" cx={stage.x} cy={stage.y} r="54" />
            <text className="enterprise-build-flywheel__number" x={stage.x} y={stage.y - 13} textAnchor="middle">{stage.number}</text>
            <text className="enterprise-build-flywheel__label" x={stage.x} y={stage.y + 14} textAnchor="middle">{stage.label}</text>
          </g>
        ))}

        <text className="enterprise-build-flywheel__center" x="520" y="242" textAnchor="middle">How work</text>
        <text className="enterprise-build-flywheel__center" x="520" y="270" textAnchor="middle">gets done</text>

        <text className="enterprise-build-flywheel__end-title" x="758" y="207">Reusable solutions</text>
        <text className="enterprise-build-flywheel__end-sub" x="758" y="239">Tested and documented</text>
        <path className="enterprise-build-flywheel__rail" d="M 752 263 H 1006" />
      </svg>

      <div className="enterprise-build-flywheel__mobile-end">
        <strong>Work inventory</strong>
        <span>Prioritized workflows</span>
      </div>
      <ol className="enterprise-build-flywheel__mobile" aria-label="How work gets done: enterprise workflow delivery cycle stages">
        <li><span>01</span><strong>Select</strong></li>
        <li><span>02</span><strong>Build</strong></li>
        <li><span>03</span><strong>Prove</strong></li>
        <li><span>04</span><strong>Reuse</strong></li>
      </ol>
      <div className="enterprise-build-flywheel__mobile-end">
        <strong>Reusable solutions</strong>
        <span>Tested and documented</span>
      </div>
    </figure>
  );
}

export function EnterpriseBuildPage() {
  const [activeSection, setActiveSection] = useState<PresentationSectionId>(presentationSections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (current) setActiveSection(current.target.id as PresentationSectionId);
      },
      { rootMargin: "-44% 0px -51% 0px", threshold: 0 },
    );

    presentationSections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const moveToSection = (id: PresentationSectionId) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  const exactTrailIndex = presentationTrail.findIndex((item) => item.sectionId === activeSection);
  const activeTrailIndex = exactTrailIndex >= 0
    ? exactTrailIndex
    : ["enterprise-build-return", "enterprise-build-close"].includes(activeSection)
      ? presentationTrail.findIndex((item) => item.id === "certify")
      : -1;

  return (
    <div className="enterprise-build-page">
      <header className="enterprise-build-masthead">
        <div className="enterprise-build-masthead__identity" aria-label="Mike Tagariello, Enterprise AI delivery">
          <span className="enterprise-build-masthead__title">Enterprise AI delivery</span>
        </div>

        <nav className="enterprise-build-stage-trail" aria-label="Enterprise AI delivery sections">
          {presentationTrail.map((item, index) => {
            const state = activeTrailIndex < 0
              ? "idle"
              : index < activeTrailIndex
                ? "past"
                : index === activeTrailIndex
                  ? "current"
                  : "future";

            return (
              <button
                key={item.id}
                type="button"
                data-state={state}
                data-kind={item.kind}
                aria-label={`Go to ${item.label}`}
                aria-controls={item.sectionId}
                aria-current={state === "current" ? "location" : undefined}
                onClick={() => moveToSection(item.sectionId)}
              >
                <span aria-hidden="true">{item.number}</span>
                <strong>{item.label}</strong>
              </button>
            );
          })}
        </nav>
      </header>

      <section id="enterprise-build-opening" className="enterprise-build-screen enterprise-build-opening" aria-labelledby="enterprise-build-title">
        <div className="enterprise-build-screen__inner">
          <h1 id="enterprise-build-title">
            <span>I turn AI priorities</span>
            <span>into a plan teams can deliver.</span>
          </h1>
          <p className="portfolio-entry-summary">This is my approach to choosing workflows, planning the build, and defining how teams will measure results. Explore the delivery model, then inspect the agent demos that show parts of it in practice.</p>
          <button className="portfolio-entry-action" type="button" onClick={() => moveToSection("enterprise-build-system")}>Explore the delivery model <span aria-hidden="true">↓</span></button>
        </div>
      </section>

      <section id="enterprise-build-system" className="enterprise-build-screen enterprise-build-flywheel-screen" aria-labelledby="enterprise-build-flywheel-heading">
        <div className="enterprise-build-screen__inner">
          <h2 id="enterprise-build-flywheel-heading">Turn delivery experience into reusable solutions.</h2>
          <BuildFlywheel />
        </div>
      </section>

      <section id="enterprise-build-select" className="enterprise-build-screen enterprise-build-select" aria-labelledby="enterprise-build-select-heading">
        <div className="enterprise-build-screen__inner">
          <h2 id="enterprise-build-select-heading">Select the workflows worth building.</h2>
          <div className="enterprise-build-equation" aria-label="Business priorities plus feasibility assessment create a build decision">
            <div>
              <strong>Business priorities</strong>
              <span>Workflow value and business context</span>
            </div>
            <b aria-hidden="true">+</b>
            <div>
              <strong>Feasibility assessment</strong>
              <span>Agent-assisted review of effort, uncertainty, and required expertise</span>
            </div>
            <b aria-hidden="true">=</b>
            <div>
              <strong>Build decision</strong>
              <span>Build now · Validate first · Do not prioritize</span>
            </div>
          </div>
        </div>
      </section>

      <section id="enterprise-build-build" className="enterprise-build-screen enterprise-build-build" aria-labelledby="enterprise-build-build-heading">
        <div className="enterprise-build-screen__inner enterprise-build-split-heading">
          <div>
            <h2 id="enterprise-build-build-heading">Keep delivery ownership clear across build paths.</h2>
            <p>Match technical support and handoff detail to the work.</p>
            <aside className="enterprise-build-proof" aria-labelledby="enterprise-build-proof-title">
              <h3 id="enterprise-build-proof-title">From feasibility to a tested integration.</h3>
              <p>I deployed two demos: an agent investigates feasibility; a screening integration checks responses before updating a fictional recruiting record.</p>
              <a href="./integration-agents/index.html#/feasibility">Explore the recorded demos <span aria-hidden="true">↗</span></a>
            </aside>
          </div>
          <ol className="enterprise-build-paths">
            {buildPaths.map((path, index) => (
              <li key={path.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{path.title}</h3>
                  <p>{path.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="enterprise-build-prove" className="enterprise-build-screen enterprise-build-prove" aria-labelledby="enterprise-build-prove-heading">
        <div className="enterprise-build-screen__inner">
          <h2 id="enterprise-build-prove-heading">Measure how the work changes.</h2>
          <div className="enterprise-build-outcome">
            <strong>Workflow outcome</strong>
            <ul className="enterprise-build-outcome__icons" aria-label="Workflow outcomes">
              {workflowOutcomes.map(({ label, icon: Icon }) => (
                <li key={label} title={label}>
                  <Icon aria-hidden="true" strokeWidth={1.75} />
                  <span className="sr-only">{label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="enterprise-build-measures">
            {measurementPaths.map((path) => (
              <article key={path.title}>
                <h3>{path.title}</h3>
                <p>{path.description}</p>
                {path.note && <small>{path.note}</small>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="enterprise-build-certify" className="enterprise-build-screen enterprise-build-certify" aria-labelledby="enterprise-build-certify-heading">
        <div className="enterprise-build-screen__inner">
          <div className="enterprise-build-heading-row">
            <h2 id="enterprise-build-certify-heading">Keep a library of reusable solutions</h2>
            <p>Show what is ready to reuse and why.</p>
          </div>
          <ol className="enterprise-build-levels">
            {reuseReadiness.map((level, index) => (
              <li key={level.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{level.title}</h3>
                <p>{level.description}</p>
              </li>
            ))}
          </ol>
          <p className="enterprise-build-talking-point">Record results, limitations, setup requirements, owner, and version.</p>
        </div>
      </section>

      <section id="enterprise-build-return" className="enterprise-build-screen enterprise-build-return" aria-labelledby="enterprise-build-return-heading">
        <div className="enterprise-build-screen__inner">
          <h2 id="enterprise-build-return-heading">Every build improves the next.</h2>
          <div className="enterprise-build-feedback">
            <div className="enterprise-build-feedback__map" aria-label="These signals return to the work inventory">
              <strong>Work inventory</strong>
              <span>Prioritization gets sharper</span>
            </div>
            <div className="enterprise-build-feedback__signals">
              {feedbackSignals.map((signal) => (
                <article key={signal.title}>
                  <h3>{signal.title}</h3>
                  <p>{signal.description}</p>
                </article>
              ))}
            </div>
          </div>
          <p className="enterprise-build-talking-point enterprise-build-talking-point--icon">
            <RefreshCw aria-hidden="true" strokeWidth={1.75} />
            <span>Recurring friction informs new delivery team patterns.</span>
          </p>
        </div>
      </section>

      <section id="enterprise-build-close" className="enterprise-build-screen enterprise-build-close" aria-labelledby="enterprise-build-close-heading">
        <div className="enterprise-build-screen__inner">
          <h2 id="enterprise-build-close-heading">Every workflow should create ongoing value.</h2>
          <p>
            <span>In the work people do today.</span>
            <span>In the patterns other teams can reuse.</span>
          </p>
        </div>
      </section>

      <div id="enterprise-build-appendix" className="enterprise-build-appendix" aria-label="Delivery operations">
        <section className="enterprise-build-screen enterprise-build-commercialization" aria-labelledby="enterprise-build-commercialization-heading">
          <div className="enterprise-build-screen__inner">
            <h2 id="enterprise-build-commercialization-heading">Fund deployment, reuse, and upkeep.</h2>
            <div className="enterprise-build-models">
              {fundingModels.map((model) => (
                <article key={model.title}>
                  <h3>{model.title}</h3>
                  <p>{model.description}</p>
                </article>
              ))}
            </div>
            <p className="enterprise-build-talking-point">Start with one workflow. Fund reuse and upkeep as adoption grows.</p>
          </div>
        </section>

        <section className="enterprise-build-screen enterprise-build-resilience" aria-labelledby="enterprise-build-resilience-heading">
          <div className="enterprise-build-screen__inner">
            <h2 id="enterprise-build-resilience-heading">A deployed workflow is a maintained product.</h2>
            <ol className="enterprise-build-resilience__cycle">
              {resilienceSteps.map((step, index) => (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
            <p className="enterprise-build-talking-point">
              Assign an operating owner and budget for monitoring, support, and updates.
            </p>
          </div>
        </section>

        <section className="enterprise-build-screen enterprise-build-boundary" aria-labelledby="enterprise-build-boundary-heading">
          <div className="enterprise-build-screen__inner">
            <h2 id="enterprise-build-boundary-heading">Involve engineers in consequential technical decisions.</h2>
            <div className="enterprise-build-boundary__columns">
              <article>
                <h3>A delivery owner coordinates the work.</h3>
                <p>Align business owners, builders, and users on scope, quality, adoption, and outcomes.</p>
              </article>
              <article>
                <h3>Engineers assess technical risk.</h3>
                <p>Architecture, identity, security, reliability, scale, stateful integrations, and material technical uncertainty</p>
              </article>
            </div>
            <p className="enterprise-build-talking-point">
              Review technical risks before committing to a build path.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
