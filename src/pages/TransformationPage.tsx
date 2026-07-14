import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Boxes,
  BriefcaseBusiness,
  ClipboardCopy,
  Download,
  Factory,
  FileSearch,
  GitBranch,
  Network,
  Scale,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  UserRoundCheck,
  Workflow,
} from "lucide-react";
import { illustrativePosting, transformationSources, transformationTasks } from "../data/transformation";

type DemoStage = "posting" | "inventory" | "transition" | "pilot";

const demoStages: Array<{ id: DemoStage; label: string; shortLabel: string }> = [
  { id: "posting", label: "Starting evidence", shortLabel: "Evidence" },
  { id: "inventory", label: "Atomic task map", shortLabel: "Tasks" },
  { id: "transition", label: "Role and workflow", shortLabel: "Redesign" },
  { id: "pilot", label: "Pilot and packet", shortLabel: "Pilot" },
];

const stateDescriptions = {
  Automate: "System executes within approved boundaries",
  Accelerate: "AI shortens the work; a person validates",
  Copilot: "AI prepares options; a person decides",
  "Human-control": "Human owns the task with AI support",
  "Human-only": "Human authority and judgment remain central",
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
  return 0.30 * task.exposure + 0.20 * task.economicValue + 0.15 * (6 - task.humanNecessity) + 0.15 * (6 - task.controlBurden) + 0.10 * (6 - task.variance) + 0.10 * (6 - task.bottleneck);
}

function disruption(task: (typeof transformationTasks)[number]) {
  return 0.25 * task.exposure + 0.20 * task.complementarity + 0.20 * task.bundle + 0.20 * task.bottleneck + 0.15 * task.economicValue;
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
    const taskLines = transformationTasks.map((task) => [
      `### ${task.task}`,
      `- Starting evidence: ${task.evidence}`,
      `- Illustrative O*NET lens: ${task.onetLens}`,
      `- Exposure assessment: ${task.exposureClass} (${task.exposure}/5) — ${task.exposureAssessment}`,
      `- O-ring judgment: ${task.oRingJudgment}`,
      `- Future state: ${task.futureState}`,
      `- Decision rationale: ${task.rationale}`,
      `- Required control: ${task.requiredControl}`,
      `- Validation status: ${task.validationStatus}`,
    ].join("\n")).join("\n\n");

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
    const keyMoves: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let nextIndex = index;
    if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = demoStages.length - 1;
    else if (event.key in keyMoves) nextIndex = (index + keyMoves[event.key] + demoStages.length) % demoStages.length;
    else return;
    event.preventDefault();
    const nextStage = demoStages[nextIndex];
    changeStage(nextStage.id, false);
    requestAnimationFrame(() => document.querySelector<HTMLButtonElement>(`#tf-tab-${nextStage.id}`)?.focus());
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
    <div className="transformation-page">
      <section className="tf-hero tf-problem-hero section-pad">
        <div className="tf-hero-copy">
          <p className="tf-byline">A Consulting Reformed point of view by Mike Tagariello.</p>
          <h1>AI deployments do not have an AI problem. They have a work-design problem.</h1>
          <button className="tf-button" type="button" onClick={() => document.querySelector("#factory-demo")?.scrollIntoView()}>See the method in practice <ArrowRight aria-hidden="true" size={18} /></button>
        </div>

        <div className="tf-problem-panel" aria-label="Why common AI deployment approaches stall">
          <h2 className="tf-panel-heading">Where deployment stalls</h2>
          <ol>
            <li><span className="tf-problem-icon"><Boxes aria-hidden="true" size={22} /></span><div><strong>Pilot portfolios</strong><p>Prove that a model can help with isolated tasks, but not how the operating model should change.</p></div></li>
            <li><span className="tf-problem-icon"><BriefcaseBusiness aria-hidden="true" size={22} /></span><div><strong>Job-title exposure</strong><p>Averages unlike tasks together and treats technical feasibility as a management decision.</p></div></li>
            <li><span className="tf-problem-icon"><Sparkles aria-hidden="true" size={22} /></span><div><strong>Generic enablement</strong><p>Teaches features and prompting without redesigning the workflow, controls, or accountability.</p></div></li>
          </ol>
          <div className="tf-missing-layer"><TriangleAlert aria-hidden="true" size={21} /><span><strong>The missing layer</strong>A repeatable translation from what AI might do to how real work should change.</span></div>
        </div>

      </section>

      <section className="tf-factory-bridge section-pad">
        <div className="tf-section-heading">
          <h2>Exposure is an input.<br />Role design is the decision.</h2>
        </div>

        <div className="tf-factory-sequence" aria-label="Transformation Factory sequence">
          <div className="tf-system-label"><Factory aria-hidden="true" size={20} />Transformation Factory</div>
          <ol>
            {["Work evidence", "Atomic tasks", "Exposure + O-ring", "Role + controls", "Pilot decision"].map((stage, index) => <li key={stage}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong>{index < 4 && <ArrowRight aria-hidden="true" size={17} />}</li>)}
          </ol>
          <div className="tf-decision-record tf-question-answer"><Scale aria-hidden="true" size={24} /><div><strong>What does “O-ring” mean here?</strong><p>One weak or unautomated link can constrain the whole workflow. O-ring judgment accounts for bottlenecks, complementary tasks, and bundle dependencies before a role is redesigned.</p></div></div>
        </div>

        <div className="tf-lenses-grid">
          <article><span><Network aria-hidden="true" /></span><h3>Normalize the work with O*NET</h3><p>Provides a comparable task language across local roles and business units.</p></article>
          <article><span><Bot aria-hidden="true" /></span><h3>Assess capability through exposure</h3><p>Separates direct model support from opportunities requiring software, retrieval, and validation.</p></article>
          <article><span><GitBranch aria-hidden="true" /></span><h3>Correct the economics with O-ring judgment</h3><p>Accounts for bottlenecks, complements, bundles, controls, and remaining human work.</p></article>
          <article className="tf-result-card"><span><BriefcaseBusiness aria-hidden="true" /></span><h3>Make the role-transition decision</h3><p>Defines what to automate, accelerate, support, control, or keep human-only.</p></article>
        </div>
      </section>

      <section className="tf-demo section-pad" id="factory-demo">
        <div className="tf-section-heading">
          <h2>Role redesign becomes practical when every decision stays reviewable.</h2>
          <p>Walk through the evidence, task map, future-state workflow, and pilot packet.</p>
        </div>

        <div className="tf-demo-tabs" role="tablist" aria-label="Transformation walkthrough">
          {demoStages.map((stage, index) => <button id={`tf-tab-${stage.id}`} key={stage.id} type="button" role="tab" aria-selected={demoStage === stage.id} aria-controls={`tf-panel-${stage.id}`} tabIndex={demoStage === stage.id ? 0 : -1} onClick={() => changeStage(stage.id, false)} onKeyDown={(event) => handleTabKeyDown(event, index)}><span>{index + 1}</span>{stage.label}</button>)}
        </div>

        <div className="tf-demo-surface">
          {demoStage === "posting" && <div className="tf-posting-view" id="tf-panel-posting" role="tabpanel" aria-labelledby="tf-tab-posting">
            <article className="tf-posting">
              <h3 ref={stageHeadingRef} tabIndex={-1}>Illustrative job posting: {illustrativePosting.title}</h3>
              <small>{illustrativePosting.context}</small>
              <p>{illustrativePosting.summary}</p>
              <h4>Selected responsibilities</h4>
              <ul>{illustrativePosting.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <aside className="tf-intake-note"><FileSearch aria-hidden="true" size={27} /><h3>Stage 1: Treat the posting as a source, not the truth.</h3><strong>Decision at this stage</strong><p>Use the posting to form task hypotheses and an evidence request. Do not declare the job “exposed.”</p><div className="tf-stage-complete"><ShieldCheck aria-hidden="true" size={17} /><span><b>Stage output:</b> seven candidate tasks and the evidence needed to validate them.</span></div><button className="tf-button" type="button" onClick={() => changeStage("inventory")}>Inspect the task map <ArrowRight aria-hidden="true" size={17} /></button></aside>
          </div>}

          {demoStage === "inventory" && <div className="tf-inventory-view" id="tf-panel-inventory" role="tabpanel" aria-labelledby="tf-tab-inventory">
            <div className="tf-task-list-wrap">
              <h3 className="tf-stage-heading">Stage 2: Inspect each decision record</h3>
              <ul className="tf-task-list" aria-label="Illustrative atomic tasks">
                {transformationTasks.map((task) => <li key={task.id}><button type="button" className={selectedTask.id === task.id ? "selected" : ""} aria-pressed={selectedTask.id === task.id} onClick={() => setSelectedTaskId(task.id)}><span className={`tf-state-dot state-${task.futureState.toLowerCase()}`} /><span><strong>{task.task}</strong><small>{task.exposureClass} exposure · {task.futureState}</small></span><ArrowRight aria-hidden="true" size={16} /></button></li>)}
              </ul>
            </div>
            <article className="tf-task-inspector">
              <h3 ref={stageHeadingRef} tabIndex={-1}>Illustrative decision record: {selectedTask.task}</h3>
              <dl className="tf-decision-fields">
                <div><dt>Starting evidence</dt><dd>{selectedTask.evidence}</dd></div>
                <div><dt>Illustrative mapping</dt><dd>{selectedTask.onetLens}</dd></div>
                <div><dt>Exposure assessment</dt><dd><strong>{selectedTask.exposureClass} · {selectedTask.exposure}/5</strong>{selectedTask.exposureAssessment}</dd></div>
                <div><dt>O-ring judgment</dt><dd>{selectedTask.oRingJudgment}</dd></div>
                <div><dt>Future-state decision</dt><dd><span className={`tf-state-tag state-${selectedTask.futureState.toLowerCase()}`}>{selectedTask.futureState}</span>{selectedTask.rationale}</dd></div>
                <div><dt>Required control</dt><dd>{selectedTask.requiredControl}</dd></div>
              </dl>
              <div className="tf-score-pair"><span><small>Automation readiness</small><strong>{readiness(selectedTask).toFixed(1)}</strong></span><span><small>O-ring disruption</small><strong>{disruption(selectedTask).toFixed(1)}</strong></span></div>
              <p className="tf-validation-status"><ShieldCheck aria-hidden="true" size={17} /><span><strong>Validation status</strong>{selectedTask.validationStatus}</span></p>
              <div className="tf-stage-actions"><button className="tf-button tf-button-secondary" type="button" onClick={() => changeStage("posting")}><ArrowLeft aria-hidden="true" size={17} />Back</button><button className="tf-button" type="button" onClick={() => changeStage("transition")}>See the role redesign <ArrowRight aria-hidden="true" size={17} /></button></div>
            </article>
          </div>}

          {demoStage === "transition" && <div className="tf-transition-view" id="tf-panel-transition" role="tabpanel" aria-labelledby="tf-tab-transition">
            <div className="tf-transition-role">
              <h3 ref={stageHeadingRef} tabIndex={-1}>Stage 3: The role changes because the task bundle changes.</h3>
              <p>The proposed transition is not a renamed job. Routine coordination moves into a governed workflow, while exception ownership, advice, negotiation, and control judgment become a larger share of human work.</p>
              <div className="tf-work-allocation">
                <article><small>Reduced or packaged</small><strong>Request checks, routing recommendations, routine communications, report assembly</strong></article>
                <article><small>Accelerated</small><strong>Operating narratives, procedure updates, option preparation, precedent review</strong></article>
                <article><small>Remains human-owned</small><strong>Exceptions, supplier commitments, risk acceptance, stakeholder advice</strong></article>
                <article><small>Becomes more valuable</small><strong>Control validation, judgment, escalation quality, workflow improvement</strong></article>
              </div>
              <div className="tf-role-owner"><Workflow aria-hidden="true" size={22} /><span><strong>New ownership emphasis</strong>The manager becomes accountable for workflow performance, exception quality, controls, and continuous redesign—not manual coordination volume.</span></div>
              <div className="tf-stage-actions"><button className="tf-button tf-button-secondary" type="button" onClick={() => changeStage("inventory")}><ArrowLeft aria-hidden="true" size={17} />Back</button><button className="tf-button" type="button" onClick={() => changeStage("pilot")}>Build the pilot packet <ArrowRight aria-hidden="true" size={17} /></button></div>
            </div>
            <div className="tf-transition-side">
              <div className="tf-state-stack">
                {Object.entries(stateDescriptions).map(([state, description]) => {
                  const count = transformationTasks.filter((task) => task.futureState === state).length;
                  return <div key={state} className={`state-${state.toLowerCase()}`}><span>{count}</span><strong>{state}</strong><small>{description}</small></div>;
                })}
              </div>
              <aside className="tf-controls-visible"><ShieldCheck aria-hidden="true" size={25} /><h4>Controls ship inside the workflow.</h4><ul><li>Ground outputs in approved policy and system records.</li><li>Route exceptions and commitments to accountable people.</li><li>Log sources, assumptions, changes, and approvals.</li><li>Measure quality and rework—not speed alone.</li></ul></aside>
            </div>
          </div>}

          {demoStage === "pilot" && <div className="tf-pilot-view" id="tf-panel-pilot" role="tabpanel" aria-labelledby="tf-tab-pilot">
            <div className="tf-pilot-plan">
              <h3 ref={stageHeadingRef} tabIndex={-1}>Stage 4: Prove the operating system on one workflow.</h3>
              <ol><li><span>01</span><div><strong>Validate the work</strong><p>Review real requests, policies, exception logs, reports, and handoffs with role holders and process owners.</p></div></li><li><span>02</span><div><strong>Package one workflow</strong><p>Combine request checks, routing recommendations, communications, and escalation instead of automating an isolated task.</p></div></li><li><span>03</span><div><strong>Embed controls</strong><p>Grounding, confidence thresholds, human approval, audit trail, and explicit do-not-automate boundaries.</p></div></li><li><span>04</span><div><strong>Measure and decide</strong><p>Cycle time, first-pass quality, exception accuracy, rework, user trust, sustained use, and control failures.</p></div></li></ol>
              <button className="tf-button tf-button-secondary" type="button" onClick={() => changeStage("transition")}><ArrowLeft aria-hidden="true" size={17} />Back to role design</button>
            </div>
            <aside className="tf-packet-actions"><Boxes aria-hidden="true" size={28} /><h3>Inspect the completed transformation packet.</h3><p>The packet preserves the evidence boundary, task decisions, controls, validation needs, pilot measures, and accountable human gates shown in the walkthrough.</p><button className="tf-button" type="button" onClick={copyPacket}><ClipboardCopy aria-hidden="true" size={17} />Copy packet</button><button className="tf-button tf-button-secondary" type="button" onClick={downloadPacket}><Download aria-hidden="true" size={17} />Save Markdown</button><span className="tf-copy-status" role="status">{copyStatus}</span><details><summary>Preview the complete packet</summary><pre>{packet}</pre></details></aside>
          </div>}
        </div>

        <p className="tf-progress-note" aria-live="polite">Stage {stageIndex + 1} of {demoStages.length}: {demoStages[stageIndex].label}. {stageIndex < demoStages.length - 1 ? `Next: ${demoStages[stageIndex + 1].shortLabel}.` : "The packet is ready to inspect."}</p>
      </section>

      <section className="tf-method-depth section-pad">
        <div className="tf-section-heading"><h2>Concise on the surface.<br />Reviewable underneath.</h2></div>
        <div className="tf-method-disclosures">
          <details><summary><Bot aria-hidden="true" size={20} /><strong>E0, E1, and E2 classify technical capability</strong></summary><div><p><b>E0:</b> present models and software do not reliably support the task at acceptable quality.</p><p><b>E1:</b> a strong model can directly support or perform the task with limited scaffolding.</p><p><b>E2:</b> the opportunity depends on software, retrieval, integrations, validation, interfaces, or system actions around the model.</p><p className="tf-method-caveat">Exposure describes technical potential. It does not establish business value, safety, or substitutability.</p></div></details>
          <details><summary><Scale aria-hidden="true" size={20} /><strong>Two scores keep quick wins and role disruption separate</strong></summary><div><p><b>Automation readiness:</b> 0.30×Exposure + 0.20×Economic value + 0.15×(6−Human necessity) + 0.15×(6−Control burden) + 0.10×(6−Variance) + 0.10×(6−Bottleneck).</p><p><b>O-ring disruption:</b> 0.25×Exposure + 0.20×Complementarity + 0.20×Bundle dependence + 0.20×Bottleneck + 0.15×Economic value.</p><p className="tf-method-caveat">These applied formulas organize review; they are not validated prediction models.</p></div></details>
          <details><summary><FileSearch aria-hidden="true" size={20} /><strong>What the demonstration does and does not prove</strong></summary><div><p>The job posting, mappings, task scores, controls, and transition design are illustrative hypotheses. A real engagement would validate them against SOPs, work samples, system records, exception logs, audit findings, and interviews.</p><p>Source evidence, mapping decisions, exposure judgments, O-ring judgments, and future-state recommendations remain separate fields so disagreement can be resolved without rewriting the entire analysis.</p></div></details>
          <details><summary><UserRoundCheck aria-hidden="true" size={20} /><strong>Accountable people decide at every governance gate</strong></summary><div><ol>{governanceGates.map((gate) => <li key={gate}>{gate}</li>)}</ol></div></details>
        </div>
      </section>

      <section className="tf-governance section-pad">
        <div className="tf-section-heading"><h2>AI accelerates the analysis.<br />People own the decisions.</h2></div>
        <div className="tf-governance-grid"><article><Sparkles aria-hidden="true" /><h3>Faster artifact production</h3><p>AI can help extract tasks, propose mappings, compare evidence, and draft workflow artifacts.</p></article><article><Scale aria-hidden="true" /><h3>Visible judgment</h3><p>Known facts, assumptions, applied scores, design choices, and limitations stay distinct and reviewable.</p></article><article><UserRoundCheck aria-hidden="true" /><h3>Accountable gates</h3><p>Leaders and subject-matter experts own source validity, risk acceptance, workflow design, the pilot, and any scale decision.</p></article></div>
      </section>

      <section className="tf-sources section-pad">
        <div className="tf-section-heading"><h2>Claims and sources stay separate.</h2><p>These sources anchor the method. The worked transformation remains an illustrative application requiring validation before consequential use.</p></div>
        <div className="tf-source-list">{transformationSources.map((source) => <article key={source.id}><div><small>{source.reformType}</small><h3>{source.title}</h3><p>{source.locator}</p></div><dl><div><dt>Best use</dt><dd>{source.bestUse}</dd></div><div><dt>Caveat</dt><dd>{source.caveat}</dd></div><div><dt>Status</dt><dd>{source.verificationStatus}</dd></div></dl></article>)}</div>
      </section>
    </div>
  );
}
