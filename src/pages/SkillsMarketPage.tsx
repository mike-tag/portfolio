import { useState } from "react";
import {
  ArrowRight,
  Check,
  Clipboard,
  ExternalLink,
  GitBranch,
  PackageCheck,
} from "lucide-react";
import { PortfolioCaseClosing } from "../components/PortfolioCaseClosing";
import { marketSkills } from "../data/skills";
import type { MarketSkill } from "../data/skills";

export function SkillsMarketPage() {
  const [copied, setCopied] = useState<string | null>(null);

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
    <div className="skills-collection-page">
      <section className="skills-collection-hero" aria-labelledby="skills-collection-title">
        <h1 id="skills-collection-title">I turn task-level expertise into reusable AI skills.</h1>
        <figure className="skills-collection-lifecycle">
          <figcaption>How expertise becomes a shared skill</figcaption>
          <ol>
            <li>
              <span aria-hidden="true">01</span>
              <div><strong>Find the judgment</strong><small>Start with a recurring task shaped by expert choices.</small></div>
            </li>
            <li>
              <span aria-hidden="true">02</span>
              <div><strong>Encode the method</strong><small>Capture its questions, rules, trade-offs, and output.</small></div>
            </li>
            <li>
              <span aria-hidden="true">03</span>
              <div><strong>Publish the skill</strong><small>Share inspectable source and clear installation steps.</small></div>
            </li>
            <li>
              <span aria-hidden="true">04</span>
              <div><strong>Learn through reuse</strong><small>Others install, apply, and improve the method.</small></div>
            </li>
          </ol>
        </figure>
      </section>

      <div className="skills-collection-list" aria-label={`${marketSkills.length} published ${marketSkills.length === 1 ? "skill" : "skills"}`}>
        {marketSkills.map((skill) => (
          <SkillShowcase
            copied={copied}
            key={skill.id}
            onCopy={copyCommand}
            skill={skill}
          />
        ))}
      </div>

      <aside className="skills-collection-credit" aria-label="Research credit">
        <p>
          <strong>Research credit.</strong> Design Planning draws on ideas from Tom Greever, author of <cite>Articulating Design Decisions</cite>. His published resources informed the skill&apos;s approach to recommendations, rationale, and tradeoffs.
          <a href="https://tomgreever.com/resources/" target="_blank" rel="noreferrer">
            Explore Tom Greever&apos;s resources
            <ExternalLink aria-hidden="true" size={14} />
          </a>
        </p>
        <p className="skills-collection-repository-note">
          <strong>Repository.</strong> The skill is open source, MIT licensed, and includes marketplace support for Codex and Claude Code.
        </p>
      </aside>

      <PortfolioCaseClosing
        heading="Want this kind of judgment in your AI transformation work?"
        description="Connect with Mike or download his résumé after inspecting the working skill and its decision process."
      />
    </div>
  );
}

type SkillShowcaseProps = {
  skill: MarketSkill;
  copied: string | null;
  onCopy: (id: string, value: string) => void;
};

function SkillShowcase({ skill, copied, onCopy }: SkillShowcaseProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const step = skill.simulation[activeStep];
  const panelId = `${skill.id}-simulation-panel`;
  const isDecisionPending = step.kind === "recommendation" && selectedChoiceId === null;

  return (
    <article className="skills-collection-skill" id={skill.id} aria-labelledby={`${skill.id}-title`}>
      <header className="skills-collection-skill-header">
        <div>
          <p className="skills-collection-status">
            <PackageCheck aria-hidden="true" size={18} />
            <span>{skill.availability}</span>
            <span aria-hidden="true">·</span>
            <code>${skill.commandName}</code>
          </p>
          <h2 id={`${skill.id}-title`}>{skill.name}</h2>
          <p className="skills-collection-summary">{skill.summary}</p>
        </div>
        <a className="skills-collection-repository" href={skill.repositoryUrl} target="_blank" rel="noreferrer">
          <GitBranch aria-hidden="true" size={19} />
          View on GitHub
          <ExternalLink aria-hidden="true" size={15} />
        </a>
      </header>

      <section className="skills-collection-change" aria-labelledby={`${skill.id}-change-title`}>
        <h3 id={`${skill.id}-change-title`}>It turns premature production into decisions a team can inspect.</h3>
        <div className="skills-collection-change-path">
          <p><strong>Before:</strong> {skill.before}</p>
          <ArrowRight aria-hidden="true" size={26} />
          <p><strong>After:</strong> {skill.after}</p>
        </div>
      </section>

      <section className="skills-collection-simulation" aria-labelledby={`${skill.id}-simulation-title`}>
        <div className="skills-collection-simulation-heading">
          <h3 id={`${skill.id}-simulation-title`}>Three moments make the judgment visible.</h3>
          <p>This representative, static walkthrough shows how the documented workflow responds to one ambiguous request.</p>
        </div>

        <blockquote className="skills-collection-request">
          <p>“{skill.scenario}”</p>
        </blockquote>

        <div className="skills-collection-workspace">
          <ol className="skills-collection-steps" aria-label="Choose a moment in the Design Planning workflow">
            {skill.simulation.map((item, index) => (
              <li key={item.label}>
                <button
                  type="button"
                  className={activeStep === index ? "is-active" : ""}
                  aria-controls={panelId}
                  aria-pressed={activeStep === index}
                  onClick={() => setActiveStep(index)}
                >
                  <span aria-hidden="true">{index + 1}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ol>

          <div className="skills-collection-response" id={panelId} aria-live="polite">
            <h4>{step.action}</h4>

            {step.kind === "inspection" && (
              <div className="skills-collection-inspection">
                <ul>
                  {step.findings.map((finding) => (
                    <li key={finding}><Check aria-hidden="true" size={16} />{finding}</li>
                  ))}
                </ul>
                <p>It asks next: <strong>{step.nextQuestion}</strong></p>
              </div>
            )}

            {step.kind === "recommendation" && (
              <div className="skills-collection-recommendation-demo">
                <ol className="skills-collection-dialogue" aria-label="Representative conversation between the Design Planning skill and a product owner">
                  {step.conversation.map((turn, index) => (
                    <li className={`is-${turn.speaker}`} key={`${turn.speaker}-${index}`}>
                      <span className="skills-collection-speaker-mark" aria-hidden="true">
                        {turn.speaker === "skill" ? "DP" : "PO"}
                      </span>
                      <div>
                        <p className="skills-collection-speaker">
                          <strong>{turn.label}</strong>
                          <span>{turn.role}</span>
                        </p>
                        <p>{turn.message}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <fieldset className="skills-collection-decision">
                  <legend>{step.question}</legend>
                  <p className="skills-collection-decision-guidance">Compare the paths, see the skill&apos;s judgment, then choose what it should carry into the plan.</p>
                  <div className="skills-collection-choice-list">
                    {step.choices.map((choice) => {
                      const isSelected = selectedChoiceId === choice.id;
                      return (
                        <button
                          type="button"
                          className={isSelected ? "is-selected" : ""}
                          aria-pressed={isSelected}
                          key={choice.id}
                          onClick={() => setSelectedChoiceId(choice.id)}
                        >
                          <span className="skills-collection-choice-heading">
                            <span aria-hidden="true" className="skills-collection-choice-control">{isSelected ? <Check size={15} /> : null}</span>
                            <strong>{choice.title}</strong>
                            {choice.recommended ? <span className="skills-collection-recommended">Skill recommends</span> : null}
                          </span>
                          <span className="skills-collection-choice-description">{choice.description}</span>
                          <span className="skills-collection-choice-tradeoff"><strong>Trade-off:</strong> {choice.tradeoff}</span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {selectedChoiceId ? (
                  <div className="skills-collection-selection" role="status">
                    <p><strong>You chose:</strong> {step.choices.find((choice) => choice.id === selectedChoiceId)?.title}</p>
                    <p><strong>Design Planning:</strong> {step.confirmation}</p>
                  </div>
                ) : null}
              </div>
            )}

            {step.kind === "output" && (
              <div className="skills-collection-output">
                <p><PackageCheck aria-hidden="true" size={19} /><strong>{step.deliverableTitle}</strong></p>
                <ul>
                  {step.deliverableSections.map((section) => (
                    <li key={section}><Check aria-hidden="true" size={15} />{section}</li>
                  ))}
                </ul>
                <p className="skills-collection-handoff"><ArrowRight aria-hidden="true" size={17} />{step.handoff}</p>
              </div>
            )}

            <p className="skills-collection-outcome"><Check aria-hidden="true" size={17} />{step.outcome}</p>
            <button
              className="skills-collection-next"
              type="button"
              disabled={isDecisionPending}
              onClick={() => {
                if (activeStep === skill.simulation.length - 1) setSelectedChoiceId(null);
                setActiveStep((activeStep + 1) % skill.simulation.length);
              }}
            >
              {activeStep === skill.simulation.length - 1
                ? "Restart walkthrough"
                : isDecisionPending
                  ? "Choose a direction to continue"
                  : "Show the next moment"}
              <ArrowRight aria-hidden="true" size={17} />
            </button>
          </div>
        </div>
      </section>

      <details className="skills-collection-install">
        <summary>Install {skill.name} in Codex or Claude Code</summary>
        <div className="skills-collection-install-content">
          <div className="skills-collection-install-options">
            <section aria-labelledby={`${skill.id}-codex-title`}>
              <h3 id={`${skill.id}-codex-title`}>Codex</h3>
              <p>Add the marketplace, install <strong>{skill.name}</strong> from Plugins, then prompt the skill directly.</p>
              <CommandLine id={`${skill.id}-codex-install`} label="Add marketplace" value={skill.codexInstall} copied={copied} onCopy={onCopy} />
              <CommandLine id={`${skill.id}-codex-run`} label="Try this prompt" value={skill.codexPrompt} copied={copied} onCopy={onCopy} />
            </section>
            <section aria-labelledby={`${skill.id}-claude-title`}>
              <h3 id={`${skill.id}-claude-title`}>Claude Code</h3>
              <p>Add the repository marketplace, then install and run the Design Planning plugin.</p>
              <CommandLine id={`${skill.id}-claude-marketplace`} label="Add marketplace" value={skill.claudeMarketplace} copied={copied} onCopy={onCopy} />
              <CommandLine id={`${skill.id}-claude-install`} label="Install plugin" value={skill.claudeInstall} copied={copied} onCopy={onCopy} />
              <CommandLine id={`${skill.id}-claude-run`} label="Run the skill" value={skill.claudeRun} copied={copied} onCopy={onCopy} />
            </section>
          </div>
        </div>
      </details>
    </article>
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
    <div className="skills-collection-command">
      <span>{label}</span>
      <div>
        <code>{value}</code>
        <button type="button" onClick={() => onCopy(id, value)} aria-label={`Copy ${label.toLowerCase()}`}>
          {isCopied ? <Check aria-hidden="true" size={17} /> : <Clipboard aria-hidden="true" size={17} />}
          <span aria-live="polite">{isCopied ? "Copied" : "Copy"}</span>
        </button>
      </div>
    </div>
  );
}
