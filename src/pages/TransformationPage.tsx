import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  ClipboardCopy,
  Download,
  FileSearch,
  Scale,
  ShieldCheck,
  UserRoundCheck,
  Workflow,
} from "lucide-react";
import { PortfolioCaseClosing } from "../components/PortfolioCaseClosing";
import { illustrativePosting, transformationSources, transformationTasks } from "../data/transformation";

type DemoStage = "posting" | "inventory" | "transition" | "pilot";

const demoStages: Array<{ id: DemoStage; label: string; shortLabel: string }> = [
  { id: "posting", label: "Validate the work", shortLabel: "Evidence" },
  { id: "inventory", label: "Map the decisions", shortLabel: "Tasks" },
  { id: "transition", label: "Redesign the role", shortLabel: "Role" },
  { id: "pilot", label: "Plan role pilots", shortLabel: "Pilots" },
];

const stateDescriptions = {
  Automate: "The system executes within approved boundaries.",
  Accelerate: "AI shortens the work; a person validates it.",
  Copilot: "AI prepares options; a person decides.",
  "Human-control": "A person owns the task with AI support.",
  "Human-only": "Human authority and judgment remain central.",
};

const governanceGates = [
  "Validate that the source evidence reflects real work.",
  "Confirm atomic tasks and proposed O*NET mappings with role holders.",
  "Review exposure, value, risk, and O-ring assumptions.",
  "Approve future-state ownership, controls, and escalation paths.",
  "Define a bounded pilot, measures, participants, and guardrails.",
  "Scale, revise, or stop based on measured business effect.",
];

function readiness(task: (typeof transformationTasks)[number]) {
  return (
    0.3 * task.exposure +
    0.2 * task.economicValue +
    0.15 * (6 - task.humanNecessity) +
    0.15 * (6 - task.controlBurden) +
    0.1 * (6 - task.variance) +
    0.1 * (6 - task.bottleneck)
  );
}

function disruption(task: (typeof transformationTasks)[number]) {
  return (
    0.25 * task.exposure +
    0.2 * task.complementarity +
    0.2 * task.bundle +
    0.2 * task.bottleneck +
    0.15 * task.economicValue
  );
}

export function TransformationPage() {
  const [demoStage, setDemoStage] = useState<DemoStage>("posting");
  const [selectedTaskId, setSelectedTaskId] = useState(transformationTasks[0].id);
  const [copyStatus, setCopyStatus] = useState("");
  const stageHeadingRef = useRef<HTMLHeadingElement>(null);
  const hasChangedStage = useRef(false);
  const shouldFocusStage = useRef(true);
  const selectedTask = transformationTasks.find((task) => task.id === selectedTaskId) ?? transformationTasks[0];
  const stageIndex = demoStages.findIndex((stage) => stage.id === demoStage);

  useEffect(() => {
    if (hasChangedStage.current && shouldFocusStage.current) stageHeadingRef.current?.focus();
    else hasChangedStage.current = true;
  }, [demoStage]);

  const packet = useMemo(() => {
    const taskLines = transformationTasks
      .map((task) =>
        [
          `### ${task.task}`,
          `- Starting evidence: ${task.evidence}`,
          `- Illustrative O*NET lens: ${task.onetLens}`,
          `- Exposure assessment: ${task.exposureClass} (${task.exposure}/5) — ${task.exposureAssessment}`,
          `- O-ring judgment: ${task.oRingJudgment}`,
          `- Future state: ${task.futureState}`,
          `- Decision rationale: ${task.rationale}`,
          `- Required control: ${task.requiredControl}`,
          `- Validation status: ${task.validationStatus}`,
        ].join("\n"),
      )
      .join("\n\n");

    return `# Consulting Reformed: Transformation Factory demonstration packet

## Decision this packet supports
Determine how a procurement operations manager role could be recomposed around AI, what should remain human-owned, and what evidence and controls are required before a pilot.

## Starting hypothesis
Role: ${illustrativePosting.title}
Source: Illustrative composite job posting. A posting describes intended responsibility; it is not sufficient evidence of real work.

## Task transition design
${taskLines}

## Proposed future work allocation
- Package routine request checks, routing recommendations, approved communications, and report assembly into a governed workflow.
- Accelerate reporting and procedure maintenance with source-linked drafts and accountable approval.
- Keep exception decisions, stakeholder advice, supplier negotiation, risk acceptance, and commitments human-owned.
- Shift the manager's time toward exception ownership, control validation, stakeholder judgment, and continuous workflow improvement.

## Governance gates
${governanceGates.map((gate, index) => `${index + 1}. ${gate}`).join("\n")}

## Required next evidence
SOPs; purchase-request samples; approval matrix; exception logs; monthly reports; audit findings; system-field definitions; stakeholder, supplier, process-owner, and risk-owner interviews.

## Pilot measures
Cycle time; first-pass quality; exception accuracy; rework; escalation quality; control failures; user trust; sustained use.

## Important limitation
This packet demonstrates a method. Its mappings, scores, controls, and role recommendations are illustrative hypotheses, not validated enterprise recommendations.`;
  }, []);

  const changeStage = (stage: DemoStage, focusHeading = true) => {
    shouldFocusStage.current = focusHeading;
    setDemoStage(stage);
    setCopyStatus("");
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keyMoves: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };
    let nextIndex = index;

    if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = demoStages.length - 1;
    else if (event.key in keyMoves) {
      nextIndex = (index + keyMoves[event.key] + demoStages.length) % demoStages.length;
    } else {
      return;
    }

    event.preventDefault();
    const nextStage = demoStages[nextIndex];
    changeStage(nextStage.id, false);
    requestAnimationFrame(() => {
      document.querySelector<HTMLButtonElement>(`#cr-case-tab-${nextStage.id}`)?.focus();
    });
  };

  const copyPacket = async () => {
    try {
      await navigator.clipboard.writeText(packet);
      setCopyStatus("Transformation packet copied.");
    } catch {
      setCopyStatus("Copy is unavailable here. Open the packet preview and copy it manually.");
    }
  };

  const downloadPacket = () => {
    const blob = new Blob([packet], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "consulting-reformed-transformation-packet.md";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="cr-case-page">
      <section className="cr-case-hero" aria-labelledby="cr-case-title">
        <div className="cr-case-hero-copy">
          <h1 id="cr-case-title">I redesign work around people, AI, and clear responsibility.</h1>
          <p className="cr-case-diagnosis">I built this interactive method to turn a job description into a task map, a redesigned role, and a pilot plan. Follow a sample procurement role and inspect the decisions.</p>
          <button
            className="cr-case-button"
            type="button"
            onClick={() => document.querySelector("#transformation-walkthrough")?.scrollIntoView()}
          >
            Follow a role redesign
            <ArrowRight aria-hidden="true" size={18} />
          </button>
        </div>

        <article className="cr-case-proof" aria-labelledby="cr-case-proof-title">
          <h2 id="cr-case-proof-title">From role intake to governed pilots.</h2>
          <dl>
            <div>
              <dt>Role intake</dt>
              <dd>Bring job descriptions, work evidence, and role-holder knowledge into one view.</dd>
            </div>
            <div>
              <dt>Work redesign</dt>
              <dd>Turn each role into atomic tasks, future-state workflows, controls, and ownership.</dd>
            </div>
            <div>
              <dt>Pilot portfolio</dt>
              <dd>Prioritize role transitions into a portfolio of bounded, measurable pilots.</dd>
            </div>
          </dl>
          <p className="cr-case-visible-limitation">
            <ShieldCheck aria-hidden="true" size={18} />
            The walkthrough below follows one illustrative procurement role. Enterprise use requires validation against
            real work before use.
          </p>
        </article>
      </section>

      <section
        className="cr-case-section cr-case-walkthrough"
        id="transformation-walkthrough"
        aria-labelledby="cr-case-walkthrough-title"
      >
        <div className="cr-case-section-heading">
          <h2 id="cr-case-walkthrough-title">Four stages turn a role's work into governed process pilots.</h2>
          <p>Choose a stage to inspect work evidence, task decisions, the future role, and the pilots that test it.</p>
        </div>

        <div className="cr-case-tabs" role="tablist" aria-label="Transformation walkthrough">
          {demoStages.map((stage, index) => (
            <button
              id={`cr-case-tab-${stage.id}`}
              key={stage.id}
              type="button"
              role="tab"
              aria-selected={demoStage === stage.id}
              aria-controls={`cr-case-panel-${stage.id}`}
              tabIndex={demoStage === stage.id ? 0 : -1}
              onClick={() => changeStage(stage.id, false)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              <span>{index + 1}</span>
              {stage.label}
            </button>
          ))}
        </div>

        <div className="cr-case-stage-surface">
          {demoStage === "posting" && (
            <div
              className="cr-case-source-stage"
              id="cr-case-panel-posting"
              role="tabpanel"
              aria-labelledby="cr-case-tab-posting"
            >
              <article className="cr-case-source-record">
                <h3 ref={stageHeadingRef} tabIndex={-1}>
                  Start with evidence about the work, not an automation verdict.
                </h3>
                <p className="cr-case-record-title">{illustrativePosting.title}</p>
                <p>{illustrativePosting.context}</p>
                <p>{illustrativePosting.summary}</p>
                <ul>
                  {illustrativePosting.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <aside className="cr-case-stage-decision">
                <FileSearch aria-hidden="true" size={28} />
                <h3>A posting can frame hypotheses, but it cannot describe real work on its own.</h3>
                <p>
                  Use it to draft a task map and evidence request. Validate both against work samples, policies, system
                  records, exceptions, and role-holder interviews.
                </p>
                <p className="cr-case-stage-output">
                  <ShieldCheck aria-hidden="true" size={17} />
                  The output is seven candidate tasks and a clear validation boundary.
                </p>
                <button className="cr-case-button" type="button" onClick={() => changeStage("inventory")}>
                  Inspect the task decisions
                  <ArrowRight aria-hidden="true" size={17} />
                </button>
              </aside>
            </div>
          )}

          {demoStage === "inventory" && (
            <div
              className="cr-case-task-stage"
              id="cr-case-panel-inventory"
              role="tabpanel"
              aria-labelledby="cr-case-tab-inventory"
            >
              <div className="cr-case-task-picker">
                <h3>Choose an illustrative task record.</h3>
                <ul aria-label="Illustrative atomic tasks">
                  {transformationTasks.map((task) => (
                    <li key={task.id}>
                      <button
                        type="button"
                        aria-pressed={selectedTask.id === task.id}
                        onClick={() => setSelectedTaskId(task.id)}
                      >
                        <span
                          className={`cr-case-state-dot cr-case-state-dot--${task.futureState.toLowerCase()}`}
                          aria-hidden="true"
                        />
                        <span>
                          <strong>{task.task}</strong>
                          <small>
                            {task.exposureClass} exposure · {task.futureState}
                          </small>
                        </span>
                        <ArrowRight aria-hidden="true" size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <article className="cr-case-task-record">
                <h3 ref={stageHeadingRef} tabIndex={-1}>
                  {selectedTask.task}
                </h3>
                <dl>
                  <div>
                    <dt>Starting evidence</dt>
                    <dd>{selectedTask.evidence}</dd>
                  </div>
                  <div>
                    <dt>Illustrative mapping</dt>
                    <dd>{selectedTask.onetLens}</dd>
                  </div>
                  <div>
                    <dt>Exposure assessment</dt>
                    <dd>
                      <strong>
                        {selectedTask.exposureClass} · {selectedTask.exposure}/5
                      </strong>
                      {selectedTask.exposureAssessment}
                    </dd>
                  </div>
                  <div>
                    <dt>O-ring judgment</dt>
                    <dd>{selectedTask.oRingJudgment}</dd>
                  </div>
                  <div>
                    <dt>Future-state decision</dt>
                    <dd>
                      <span className={`cr-case-state cr-case-state--${selectedTask.futureState.toLowerCase()}`}>
                        {selectedTask.futureState}
                      </span>
                      {selectedTask.rationale}
                    </dd>
                  </div>
                  <div>
                    <dt>Required control</dt>
                    <dd>{selectedTask.requiredControl}</dd>
                  </div>
                </dl>
                <div className="cr-case-scores" aria-label="Applied review scores">
                  <span>
                    <small>Automation readiness</small>
                    <strong>{readiness(selectedTask).toFixed(1)}</strong>
                  </span>
                  <span>
                    <small>O-ring disruption</small>
                    <strong>{disruption(selectedTask).toFixed(1)}</strong>
                  </span>
                </div>
                <p className="cr-case-validation">
                  <ShieldCheck aria-hidden="true" size={18} />
                  <span>
                    <strong>Validation status</strong>
                    {selectedTask.validationStatus}
                  </span>
                </p>
                <div className="cr-case-stage-actions">
                  <button
                    className="cr-case-button cr-case-button--secondary"
                    type="button"
                    onClick={() => changeStage("posting")}
                  >
                    <ArrowLeft aria-hidden="true" size={17} />
                    Back
                  </button>
                  <button className="cr-case-button" type="button" onClick={() => changeStage("transition")}>
                    See the role redesign
                    <ArrowRight aria-hidden="true" size={17} />
                  </button>
                </div>
              </article>
            </div>
          )}

          {demoStage === "transition" && (
            <div
              className="cr-case-role-stage"
              id="cr-case-panel-transition"
              role="tabpanel"
              aria-labelledby="cr-case-tab-transition"
            >
              <div className="cr-case-role-design">
                <h3 ref={stageHeadingRef} tabIndex={-1}>
                  The role changes because the task bundle changes.
                </h3>
                <p>
                  Routine coordination moves into a governed workflow. Exception ownership, advice, negotiation, and
                  control judgment become a larger share of human work.
                </p>
                <div className="cr-case-work-allocation">
                  <article>
                    <h4>Package into the workflow</h4>
                    <p>Request checks, routing recommendations, routine communications, and report assembly.</p>
                  </article>
                  <article>
                    <h4>Accelerate with review</h4>
                    <p>Operating narratives, procedure updates, option preparation, and precedent review.</p>
                  </article>
                  <article>
                    <h4>Keep human-owned</h4>
                    <p>Exceptions, supplier commitments, risk acceptance, and stakeholder advice.</p>
                  </article>
                  <article>
                    <h4>Make more valuable</h4>
                    <p>Control validation, judgment, escalation quality, and continuous workflow improvement.</p>
                  </article>
                </div>
                <p className="cr-case-role-owner">
                  <Workflow aria-hidden="true" size={21} />
                  The manager becomes accountable for workflow performance, exception quality, controls, and
                  continuous redesign—not manual coordination volume.
                </p>
                <div className="cr-case-stage-actions">
                  <button
                    className="cr-case-button cr-case-button--secondary"
                    type="button"
                    onClick={() => changeStage("inventory")}
                  >
                    <ArrowLeft aria-hidden="true" size={17} />
                    Back
                  </button>
                  <button className="cr-case-button" type="button" onClick={() => changeStage("pilot")}>
                    Define the pilot
                    <ArrowRight aria-hidden="true" size={17} />
                  </button>
                </div>
              </div>

              <aside className="cr-case-state-summary" aria-label="Illustrative task allocation">
                <h3>Every task retains a named state and accountable owner.</h3>
                {Object.entries(stateDescriptions).map(([state, description]) => {
                  const count = transformationTasks.filter((task) => task.futureState === state).length;
                  return (
                    <div key={state}>
                      <span>{count}</span>
                      <p>
                        <strong>{state}</strong>
                        {description}
                      </p>
                    </div>
                  );
                })}
              </aside>
            </div>
          )}

          {demoStage === "pilot" && (
            <div
              className="cr-case-pilot-stage"
              id="cr-case-panel-pilot"
              role="tabpanel"
              aria-labelledby="cr-case-tab-pilot"
            >
              <div className="cr-case-pilot-plan">
                <h3 ref={stageHeadingRef} tabIndex={-1}>
                  Each role can produce one process pilot or a portfolio of pilots.
                </h3>
                <p className="cr-case-pilot-intro">
                  The Factory applies the same evidence-to-decision path to every role. Its output is a set of
                  role-transition hypotheses, each tested through a bounded process pilot.
                </p>
                <ol>
                  <li>
                    <span>1</span>
                    <p>
                      <strong>Choose the process to test.</strong> For this role, begin with a connected workflow such
                      as request intake and routing. Other roles may produce different pilots or several to sequence.
                    </p>
                  </li>
                  <li>
                    <span>2</span>
                    <p>
                      <strong>Define the role transition.</strong> State which tasks change, what remains human-owned,
                      and how the future workflow, controls, and accountability work together.
                    </p>
                  </li>
                  <li>
                    <span>3</span>
                    <p>
                      <strong>Build the pilot controls.</strong> Use grounding, confidence thresholds, human approval,
                      an audit trail, and explicit do-not-automate boundaries.
                    </p>
                  </li>
                  <li>
                    <span>4</span>
                    <p>
                      <strong>Measure and make the portfolio decision.</strong> Track cycle time, first-pass quality,
                      exception accuracy, rework, user trust, sustained use, and control failures before expanding,
                      revising, or stopping a pilot.
                    </p>
                  </li>
                </ol>
                <button
                  className="cr-case-button cr-case-button--secondary"
                  type="button"
                  onClick={() => changeStage("transition")}
                >
                  <ArrowLeft aria-hidden="true" size={17} />
                  Back to the role design
                </button>
              </div>

              <aside className="cr-case-packet">
                <h3>The work packet keeps every role pilot reviewable.</h3>
                <p>
                  It lets leaders compare role-transition hypotheses, process scope, controls, validation needs,
                  measures, and accountable human gates before an enterprise portfolio is funded or scaled.
                </p>
                <div className="cr-case-packet-actions">
                  <button className="cr-case-button" type="button" onClick={copyPacket}>
                    <ClipboardCopy aria-hidden="true" size={17} />
                    Copy packet
                  </button>
                  <button
                    className="cr-case-button cr-case-button--secondary"
                    type="button"
                    onClick={downloadPacket}
                  >
                    <Download aria-hidden="true" size={17} />
                    Save Markdown
                  </button>
                </div>
                <span className="cr-case-copy-status" role="status">
                  {copyStatus}
                </span>
                <details className="cr-case-packet-preview">
                  <summary>Preview the complete packet</summary>
                  <pre>{packet}</pre>
                </details>
              </aside>
            </div>
          )}
        </div>

        <p className="cr-case-progress" aria-live="polite">
          Stage {stageIndex + 1} of {demoStages.length}: {demoStages[stageIndex].label}.{" "}
          {stageIndex < demoStages.length - 1
            ? `Next: ${demoStages[stageIndex + 1].shortLabel}.`
            : "The packet is ready to inspect."}
        </p>
      </section>

      <section className="cr-case-section cr-case-contribution" aria-labelledby="cr-case-contribution-title">
        <h2 id="cr-case-contribution-title">Mike made the transformation judgment inspectable.</h2>
        <p>
          He authored the method, translated research into a decision model, designed the interaction, and built the
          working case so leaders can challenge individual assumptions without losing the whole recommendation.
        </p>
        <ul>
          <li>
            <strong>Separated facts from judgment.</strong> Source evidence, mappings, exposure, economic assumptions,
            controls, and recommendations remain distinct.
          </li>
          <li>
            <strong>Designed for consequential review.</strong> Every future-state recommendation carries a rationale,
            required control, and validation status.
          </li>
          <li>
            <strong>Turned analysis into action.</strong> The final packet defines the evidence, owners, guardrails,
            measures, and decision gates needed for a pilot.
          </li>
        </ul>
      </section>

      <section className="cr-case-section cr-case-depth" aria-labelledby="cr-case-depth-title">
        <div className="cr-case-section-heading">
          <h2 id="cr-case-depth-title">Inspect the assumptions behind the recommendation.</h2>
          <p>The main case stays concise. The mechanics, governance, and source records remain available here.</p>
        </div>

        <div className="cr-case-disclosures">
          <details>
            <summary>
              <Bot aria-hidden="true" size={21} />
              How exposure and O-ring judgment work
            </summary>
            <div className="cr-case-disclosure-body">
              <p>
                <strong>E0</strong> means current models and software do not reliably support the task at acceptable
                quality. <strong>E1</strong> means a strong model can support or perform it with limited scaffolding.{" "}
                <strong>E2</strong> means the opportunity depends on software, retrieval, integrations, validation,
                interfaces, or system actions around the model.
              </p>
              <p>
                O-ring judgment tests whether value depends on a bottleneck, complementary human work, or several tasks
                moving together. Exposure describes technical potential; it does not establish business value, safety,
                or substitutability.
              </p>
            </div>
          </details>

          <details>
            <summary>
              <Scale aria-hidden="true" size={21} />
              The applied scoring formulas and their limits
            </summary>
            <div className="cr-case-disclosure-body">
              <p>
                <strong>Automation readiness:</strong> 0.30×Exposure + 0.20×Economic value +
                0.15×(6−Human necessity) + 0.15×(6−Control burden) + 0.10×(6−Variance) +
                0.10×(6−Bottleneck).
              </p>
              <p>
                <strong>O-ring disruption:</strong> 0.25×Exposure + 0.20×Complementarity + 0.20×Bundle dependence +
                0.20×Bottleneck + 0.15×Economic value.
              </p>
              <p className="cr-case-caveat">
                These formulas organize review and comparison. They are applied heuristics, not validated prediction
                models.
              </p>
            </div>
          </details>

          <details>
            <summary>
              <UserRoundCheck aria-hidden="true" size={21} />
              The governance gates people must own
            </summary>
            <div className="cr-case-disclosure-body">
              <ol>
                {governanceGates.map((gate) => (
                  <li key={gate}>{gate}</li>
                ))}
              </ol>
            </div>
          </details>

          <details>
            <summary>
              <FileSearch aria-hidden="true" size={21} />
              Complete method sources and qualifications
            </summary>
            <div className="cr-case-disclosure-body cr-case-sources">
              <p>
                These bibliographic records anchor the method. They do not validate the illustrative procurement
                recommendation.
              </p>
              {transformationSources.map((source) => (
                <article key={source.id}>
                  <h3>{source.title}</h3>
                  <dl>
                    <div>
                      <dt>Source locator</dt>
                      <dd>{source.locator}</dd>
                    </div>
                    <div>
                      <dt>Best use</dt>
                      <dd>{source.bestUse}</dd>
                    </div>
                    <div>
                      <dt>Caveat</dt>
                      <dd>{source.caveat}</dd>
                    </div>
                    <div>
                      <dt>Reform type</dt>
                      <dd>{source.reformType}</dd>
                    </div>
                    <div>
                      <dt>Verification status</dt>
                      <dd>{source.verificationStatus}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </details>

          <details>
            <summary>
              <ShieldCheck aria-hidden="true" size={21} />
              What this demonstration does and does not prove
            </summary>
            <div className="cr-case-disclosure-body">
              <p>
                The job posting, mappings, task scores, controls, and transition design are illustrative hypotheses. A
                real engagement would validate them against SOPs, work samples, system records, exception logs, audit
                findings, and interviews.
              </p>
              <p>
                Keeping source evidence, mapping decisions, exposure judgments, O-ring judgments, and future-state
                recommendations separate allows reviewers to challenge one decision without rewriting the full
                analysis.
              </p>
            </div>
          </details>
        </div>
      </section>

      <PortfolioCaseClosing
        heading="Bring this level of judgment to your AI transformation."
        description="Inspect the working proof, then connect with Mike or download his résumé."
      />
    </div>
  );
}
