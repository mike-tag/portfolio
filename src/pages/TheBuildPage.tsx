import { BadgeCheck, Clock3, Gauge, RefreshCw, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";

const presentationSections = [
  { id: "the-build-opening", label: "The challenge" },
  { id: "the-build-system", label: "The flywheel" },
  { id: "the-build-select", label: "Select" },
  { id: "the-build-build", label: "Build" },
  { id: "the-build-prove", label: "Prove" },
  { id: "the-build-certify", label: "Certify" },
  { id: "the-build-return", label: "The return" },
  { id: "the-build-close", label: "Close" },
  { id: "the-build-appendix", label: "Appendix" },
] as const;

const presentationTrail = [
  { id: "select", number: "01", label: "Select", sectionId: "the-build-select", kind: "stage" },
  { id: "build", number: "02", label: "Build", sectionId: "the-build-build", kind: "stage" },
  { id: "prove", number: "03", label: "Prove", sectionId: "the-build-prove", kind: "stage" },
  { id: "certify", number: "04", label: "Certify", sectionId: "the-build-certify", kind: "stage" },
  { id: "discussion", number: "", label: "Discussion", sectionId: "the-build-appendix", kind: "discussion" },
] as const;

type PresentationSectionId = (typeof presentationSections)[number]["id"];

const buildPaths = [
  { title: "No-code build", description: "Native capabilities and repeatable patterns" },
  { title: "Low-code build", description: "Standard APIs and predictable data" },
  { title: "Engineering-supported build", description: "Complex integrations, data, or architecture" },
  {
    title: "Full system integration",
    description: "Dedicated engineering team; The Build retains workflow, quality, and outcome ownership",
  },
];

const measurementPaths = [
  { title: "Workflow Log", description: "Detailed self-reported evidence; participation-dependent" },
  { title: "Before-and-after survey", description: "A direct baseline and outcome comparison" },
  {
    title: "Classifier agent",
    description: "Behavioral signal at scale, where access, permissions, and privacy allow",
    note: "Prototype in development.",
  },
];

const workflowOutcomes = [
  { label: "Time", icon: Clock3 },
  { label: "Quality", icon: BadgeCheck },
  { label: "Throughput", icon: Gauge },
  { label: "Risk", icon: ShieldAlert },
];

const certificationLevels = [
  { title: "Validated", description: "Deployed in live work and measured against a defined outcome" },
  { title: "Certified", description: "Meets reliability, control, documentation, and maintenance standards" },
  { title: "Proven", description: "Successfully reused in a second environment" },
];

const feedbackSignals = [
  { title: "Feasibility decisions", description: "Realistic implementation effort" },
  { title: "Build patterns", description: "Proven intervention and integration routes" },
  { title: "Measured outcomes", description: "Evidence about where value materialized" },
];

const commercializationModels = [
  { title: "Pick-and-build", description: "Select one workflow to adapt and deploy" },
  { title: "Library subscription", description: "Certified Workflows, evidence, standards, and updates" },
  { title: "Enterprise portfolio", description: "Multiple workflows, dedicated capacity, and a shared roadmap" },
];

const resilienceSteps = [
  {
    title: "Version",
    description: "Version CLAUDE.md, AGENTS.md, or equivalent instructions alongside models, tools, integrations, and evaluations.",
  },
  {
    title: "Monitor",
    description: "Track usage, failures, exceptions, drift, and platform releases.",
  },
  {
    title: "Re-certify",
    description: "Material changes trigger testing and evidence review.",
  },
];

function BuildFlywheel() {
  return (
    <figure className="the-build-flywheel">
      <svg viewBox="0 0 1040 450" role="img" aria-labelledby="the-build-flywheel-title the-build-flywheel-desc">
        <title id="the-build-flywheel-title">The Build operating flywheel</title>
        <desc id="the-build-flywheel-desc">
          Value-ranked workflows from the Work Map enter a four-stage cycle: Select, Build, Prove, and Certify.
          The output is a set of reusable, proven Certified Workflows.
        </desc>

        <text className="the-build-flywheel__end-title" x="34" y="207">Work Map</text>
        <text className="the-build-flywheel__end-sub" x="34" y="239">Value-ranked workflows</text>
        <path className="the-build-flywheel__rail" d="M 34 263 H 288" />

        <circle className="the-build-flywheel__track-soft" cx="520" cy="252" r="174" />
        <circle className="the-build-flywheel__track" cx="520" cy="252" r="174" />
        <path className="the-build-flywheel__direction" d="M 512 74 L 528 78 L 512 84 z" />
        <path className="the-build-flywheel__direction" d="M 688 244 L 694 260 L 700 244 z" />
        <path className="the-build-flywheel__direction" d="M 528 420 L 512 426 L 528 432 z" />
        <path className="the-build-flywheel__direction" d="M 340 260 L 346 244 L 352 260 z" />

        {[
          { number: "01", label: "Select", x: 397, y: 129 },
          { number: "02", label: "Build", x: 643, y: 129 },
          { number: "03", label: "Prove", x: 643, y: 375 },
          { number: "04", label: "Certify", x: 397, y: 375 },
        ].map((stage) => (
          <g key={stage.number}>
            <circle className="the-build-flywheel__node" cx={stage.x} cy={stage.y} r="54" />
            <text className="the-build-flywheel__number" x={stage.x} y={stage.y - 13} textAnchor="middle">{stage.number}</text>
            <text className="the-build-flywheel__label" x={stage.x} y={stage.y + 14} textAnchor="middle">{stage.label}</text>
          </g>
        ))}

        <text className="the-build-flywheel__center" x="520" y="242" textAnchor="middle">The workflow is</text>
        <text className="the-build-flywheel__center" x="520" y="270" textAnchor="middle">the core unit.</text>

        <text className="the-build-flywheel__end-title" x="758" y="207">Certified workflows</text>
        <text className="the-build-flywheel__end-sub" x="758" y="239">Reusable, proven assets</text>
        <path className="the-build-flywheel__rail" d="M 752 263 H 1006" />
      </svg>

      <div className="the-build-flywheel__mobile-end">
        <strong>Work Map</strong>
        <span>Value-ranked workflows</span>
      </div>
      <ol className="the-build-flywheel__mobile" aria-label="The Build operating flywheel stages">
        <li><span>01</span><strong>Select</strong></li>
        <li><span>02</span><strong>Build</strong></li>
        <li><span>03</span><strong>Prove</strong></li>
        <li><span>04</span><strong>Certify</strong></li>
      </ol>
      <div className="the-build-flywheel__mobile-end">
        <strong>Certified workflows</strong>
        <span>Reusable, proven assets</span>
      </div>
    </figure>
  );
}

export function TheBuildPage() {
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
    : ["the-build-return", "the-build-close"].includes(activeSection)
      ? presentationTrail.findIndex((item) => item.id === "certify")
      : -1;

  return (
    <div className="the-build-page">
      <header className="the-build-masthead">
        <div className="the-build-masthead__identity" aria-label="Mike Tagariello, The Build">
          <span className="the-build-masthead__name">Mike Tagariello</span>
          <span className="the-build-masthead__title">The Build</span>
        </div>

        <nav className="the-build-stage-trail" aria-label="The Build sections">
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

      <section id="the-build-opening" className="the-build-screen the-build-opening" aria-labelledby="the-build-title">
        <div className="the-build-screen__inner">
          <h1 id="the-build-title">
            <span>Reejig has built an exceptional Work Map.</span>
            <span>The challenge is giving customers a clear, resourced path from insight to deployed value.</span>
          </h1>
        </div>
      </section>

      <section id="the-build-system" className="the-build-screen the-build-flywheel-screen" aria-labelledby="the-build-flywheel-heading">
        <div className="the-build-screen__inner">
          <h2 id="the-build-flywheel-heading">Turn work intelligence into reusable value.</h2>
          <BuildFlywheel />
        </div>
      </section>

      <section id="the-build-select" className="the-build-screen the-build-select" aria-labelledby="the-build-select-heading">
        <div className="the-build-screen__inner">
          <h2 id="the-build-select-heading">Select the workflows worth building.</h2>
          <div className="the-build-equation" aria-label="Work Map and Build Studio plus Feasibility Agent judgment create a build decision">
            <div>
              <strong>Work Map</strong>
              <span>And Build Studio</span>
            </div>
            <b aria-hidden="true">+</b>
            <div>
              <strong>Feasibility Agent</strong>
              <span>Effort, uncertainty, and required expertise</span>
            </div>
            <b aria-hidden="true">=</b>
            <div>
              <strong>Build decision</strong>
              <span>Build now · Validate first · Do not prioritize</span>
            </div>
          </div>
        </div>
      </section>

      <section id="the-build-build" className="the-build-screen the-build-build" aria-labelledby="the-build-build-heading">
        <div className="the-build-screen__inner the-build-split-heading">
          <div>
            <h2 id="the-build-build-heading">The Build owns every build path.</h2>
            <p>Handoff package and engineering depth changes.</p>
          </div>
          <ol className="the-build-paths">
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

      <section id="the-build-prove" className="the-build-screen the-build-prove" aria-labelledby="the-build-prove-heading">
        <div className="the-build-screen__inner">
          <h2 id="the-build-prove-heading">Measure how the work changes.</h2>
          <div className="the-build-outcome">
            <strong>Workflow outcome</strong>
            <ul className="the-build-outcome__icons" aria-label="Workflow outcomes">
              {workflowOutcomes.map(({ label, icon: Icon }) => (
                <li key={label} title={label}>
                  <Icon aria-hidden="true" strokeWidth={1.75} />
                  <span className="sr-only">{label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="the-build-measures">
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

      <section id="the-build-certify" className="the-build-screen the-build-certify" aria-labelledby="the-build-certify-heading">
        <div className="the-build-screen__inner">
          <div className="the-build-heading-row">
            <h2 id="the-build-certify-heading">Certification should make the evidence visible.</h2>
            <p>A proposed evidence ladder.</p>
          </div>
          <ol className="the-build-levels">
            {certificationLevels.map((level, index) => (
              <li key={level.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{level.title}</h3>
                <p>{level.description}</p>
              </li>
            ))}
          </ol>
          <p className="the-build-talking-point">Publish the level, evidence, conditions, owner, and version.</p>
        </div>
      </section>

      <section id="the-build-return" className="the-build-screen the-build-return" aria-labelledby="the-build-return-heading">
        <div className="the-build-screen__inner">
          <h2 id="the-build-return-heading">Every build improves the next.</h2>
          <div className="the-build-feedback">
            <div className="the-build-feedback__map" aria-label="These signals return to the Work Map">
              <strong>Work Map</strong>
              <span>Prioritization gets sharper</span>
            </div>
            <div className="the-build-feedback__signals">
              {feedbackSignals.map((signal) => (
                <article key={signal.title}>
                  <h3>{signal.title}</h3>
                  <p>{signal.description}</p>
                </article>
              ))}
            </div>
          </div>
          <p className="the-build-talking-point the-build-talking-point--icon">
            <RefreshCw aria-hidden="true" strokeWidth={1.75} />
            <span>Recurring friction becomes Product and Engineering input.</span>
          </p>
        </div>
      </section>

      <section id="the-build-close" className="the-build-screen the-build-close" aria-labelledby="the-build-close-heading">
        <div className="the-build-screen__inner">
          <h2 id="the-build-close-heading">Every workflow should create ongoing value.</h2>
          <p>
            <span>Once in the customer’s work.</span>
            <span>Again as a reusable Reejig asset.</span>
          </p>
        </div>
      </section>

      <div id="the-build-appendix" className="the-build-appendix" aria-label="Appendix">
        <section className="the-build-screen the-build-commercialization" aria-labelledby="the-build-commercialization-heading">
          <div className="the-build-screen__inner">
            <h2 id="the-build-commercialization-heading">Commercialize access, activation, and upkeep.</h2>
            <div className="the-build-models">
              {commercializationModels.map((model) => (
                <article key={model.title}>
                  <h3>{model.title}</h3>
                  <p>{model.description}</p>
                </article>
              ))}
            </div>
            <p className="the-build-talking-point">Start with activation, then lead into subscription.</p>
          </div>
        </section>

        <section className="the-build-screen the-build-resilience" aria-labelledby="the-build-resilience-heading">
          <div className="the-build-screen__inner">
            <h2 id="the-build-resilience-heading">A deployed workflow is a maintained product.</h2>
            <ol className="the-build-resilience__cycle">
              {resilienceSteps.map((step, index) => (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
            <p className="the-build-talking-point">
              Each customer needs a named operating owner. The Build provides the standards, monitoring patterns, and updates.
            </p>
          </div>
        </section>

        <section className="the-build-screen the-build-boundary" aria-labelledby="the-build-boundary-heading">
          <div className="the-build-screen__inner">
            <h2 id="the-build-boundary-heading">Engineering enters when judgment demands it.</h2>
            <div className="the-build-boundary__columns">
              <article>
                <h3>The Build stays close to every workflow.</h3>
                <p>Value, feasibility, build path, quality, deployment, adoption, and measurement remain with The Build.</p>
              </article>
              <article>
                <h3>Engineering joins for consequential technical decisions.</h3>
                <p>Architecture, identity, security, reliability, scale, stateful integrations, and material technical uncertainty</p>
              </article>
            </div>
            <p className="the-build-talking-point">
              Bring in deeper engineering expertise before risk becomes rework. (Or better yet, get in front of it.)
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
