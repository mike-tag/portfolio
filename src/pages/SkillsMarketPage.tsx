import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clipboard,
  ExternalLink,
  GitBranch,
  PackageCheck,
} from "lucide-react";
import { marketSkills } from "../data/skills";

export function SkillsMarketPage() {
  const skill = marketSkills[0];
  const [activeStep, setActiveStep] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const step = skill.simulation[activeStep];

  function exploreSkill() {
    const skillArticle = document.getElementById("design-planning");
    const skillHeading = document.getElementById("design-planning-title");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    skillArticle?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    skillHeading?.setAttribute("tabindex", "-1");
    skillHeading?.focus({ preventScroll: true });
  }

  async function copyCommand(id: string, value: string) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(value);
      setCopied(id);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = value;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      const didCopy = document.execCommand("copy");
      textArea.remove();
      if (!didCopy) return;
      setCopied(id);
    }
    window.setTimeout(() => setCopied(null), 1800);
  }

  return (
    <div className="skills-market-page">
      <section className="skills-hero" aria-labelledby="skills-title">
        <a className="skills-back-link" href="#/"><ArrowLeft aria-hidden="true" size={16} />Back to portfolio</a>
        <div className="skills-hero-grid">
          <h1 id="skills-title">Skills that make the thinking visible.</h1>
          <button className="skills-hero-action" type="button" onClick={exploreSkill}>Explore the first skill<ArrowRight aria-hidden="true" size={18} /></button>
        </div>
      </section>

      <section className="skills-beliefs" aria-labelledby="skills-beliefs-title">
        <div className="skills-beliefs-heading">
          <p>How I think</p>
          <h2 id="skills-beliefs-title">Good agent work should make judgment easier to inspect—not harder.</h2>
        </div>
        <p className="skills-beliefs-copy">I build reusable agent workflows for moments when a polished answer is not enough. Each skill begins by inspecting context, keeps facts and assumptions distinct from recommendations, and makes consequential tradeoffs reviewable. The result is a method you can inspect, challenge, and use in your own AI tool.</p>
      </section>

      <article className="market-skill" id="design-planning" aria-labelledby="design-planning-title">
        <header className="market-skill-header">
          <div className="market-skill-number" aria-hidden="true">01</div>
          <div>
            <p><PackageCheck aria-hidden="true" size={17} />{skill.availability}</p>
            <h2 id="design-planning-title">{skill.name}</h2>
            <code>${skill.commandName}</code>
          </div>
        </header>

        <div className="skill-problem-solution">
          <section>
            <span>The problem</span>
            <h3>Finished-looking work can conceal unfinished thinking.</h3>
            <p>{skill.problem}</p>
          </section>
          <section>
            <span>The solution</span>
            <h3>Turn ambiguity into decisions you can review and implement with your builder agent.</h3>
            <p>{skill.solution}</p>
          </section>
        </div>

        <section className="skill-simulation" aria-labelledby="simulation-title">
          <div className="simulation-intro">
            <div>
              <p>Short simulation</p>
              <h3 id="simulation-title">See the workflow think before you install it.</h3>
            </div>
            <p>This is a representative, static walkthrough of the skill’s documented behavior.</p>
          </div>

          <blockquote className="simulation-prompt">
            <span>You</span>
            <p>“{skill.scenario}”</p>
          </blockquote>

          <div className="simulation-workspace">
            <div className="simulation-steps" aria-label="Simulation steps">
              {skill.simulation.map((item, index) => (
                <button
                  type="button"
                  key={item.label}
                  className={activeStep === index ? "is-active" : ""}
                  aria-pressed={activeStep === index}
                  onClick={() => setActiveStep(index)}
                >
                  <span>0{index + 1}</span>{item.label}
                </button>
              ))}
            </div>

            <div className="simulation-response" aria-live="polite">
              <div>
                <span>What the skill does</span>
                <p>{step.action}</p>
              </div>
              {step.kind === "question" ? (
                <blockquote className="simulation-question">
                  <img src="./design-planning-scout.png" alt="Scout, the Design Planning border collie" />
                  <div>
                    <span><strong>Scout</strong><small>Design Planning asks</small></span>
                    <p>{step.question}</p>
                  </div>
                </blockquote>
              ) : (
                <div className="simulation-deliverable" aria-label="Design Planning output">
                  <div className="simulation-deliverable-speaker">
                    <img src="./design-planning-scout.png" alt="" />
                    <span><strong>Scout</strong><small>Design Planning delivers</small></span>
                  </div>
                  <div className="simulation-output-document">
                    <p><PackageCheck aria-hidden="true" size={18} />Final output</p>
                    <h4>{step.deliverableTitle}</h4>
                    <ul>
                      {step.deliverableSections.map((section) => <li key={section}><Check aria-hidden="true" size={15} />{section}</li>)}
                    </ul>
                    <div className="simulation-output-handoff"><ArrowRight aria-hidden="true" size={17} /><span>{step.handoff}</span></div>
                  </div>
                </div>
              )}
              <p className="simulation-outcome"><Check aria-hidden="true" size={17} /><strong>Result:</strong> {step.outcome}</p>
              <button
                type="button"
                onClick={() => setActiveStep((activeStep + 1) % skill.simulation.length)}
              >
                {activeStep === skill.simulation.length - 1 ? "Restart simulation" : "Next step"}
                <ArrowRight aria-hidden="true" size={17} />
              </button>
            </div>
          </div>
        </section>

        <section className="skill-use" aria-labelledby="use-skill-title">
          <div className="skill-use-heading">
            <p>Use the real skill</p>
            <h3 id="use-skill-title">Install it in the agent you already use.</h3>
            <p>The repository is open source, MIT licensed, and includes marketplace support for Codex and Claude Code.</p>
            <a href={skill.repositoryUrl} target="_blank" rel="noreferrer">
              <GitBranch aria-hidden="true" size={19} />View the GitHub repository<ExternalLink aria-hidden="true" size={15} />
            </a>
          </div>

          <div className="install-options">
            <article>
              <h4>Codex</h4>
              <p>Add the marketplace, install <strong>Design Planning</strong> from Plugins, then prompt the skill directly.</p>
              <CommandLine id="codex-install" label="Add marketplace" value={skill.codexInstall} copied={copied} onCopy={copyCommand} />
              <CommandLine id="codex-run" label="Try this prompt" value={skill.codexPrompt} copied={copied} onCopy={copyCommand} />
            </article>
            <article>
              <h4>Claude Code</h4>
              <p>Add the repository marketplace first, then install and run the design-planning plugin.</p>
              <CommandLine id="claude-marketplace" label="Add marketplace" value={skill.claudeMarketplace} copied={copied} onCopy={copyCommand} />
              <CommandLine id="claude-install" label="Install plugin" value={skill.claudeInstall} copied={copied} onCopy={copyCommand} />
              <CommandLine id="claude-run" label="Run the skill" value={skill.claudeRun} copied={copied} onCopy={copyCommand} />
            </article>
          </div>
        </section>
      </article>
    </div>
  );
}

type CommandLineProps = {
  id: string;
  label: string;
  value: string;
  copied: string | null;
  onCopy: (id: string, value: string) => void;
};

function CommandLine({ id, label, value, copied, onCopy }: CommandLineProps) {
  const isCopied = copied === id;
  return (
    <div className="command-line">
      <span>{label}</span>
      <div>
        <code>{value}</code>
        <button type="button" onClick={() => onCopy(id, value)} aria-label={`Copy ${label.toLowerCase()}`}>
          {isCopied ? <Check aria-hidden="true" size={17} /> : <Clipboard aria-hidden="true" size={17} />}
          <span>{isCopied ? "Copied" : "Copy"}</span>
        </button>
      </div>
    </div>
  );
}
