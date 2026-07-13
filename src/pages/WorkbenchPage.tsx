import { ArrowLeft, ArrowRight, BookOpenCheck, Check, CircleCheckBig, ClipboardCheck, ClipboardCopy, ClipboardPaste, Download, FilePlus, MapPinned, MessageSquareQuote, PencilLine, Quote, Sparkles, Target, TriangleAlert, UserRoundCheck, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ValueIcon } from "../components/ValueIcon";
import { advocacyFrames, blankWorkbenchState, demoWorkbenchState, evidenceClaims, getEvidenceSourcesForClaim, reviewChecklist, vavValues } from "../data/content";
import { buildWorkPacket } from "../lib/workPacket";
import type { WorkbenchState } from "../types";

const steps = ["Your assignment", "Audience + story", "Message + evidence", "Use your prompt"];
const stepIcons: LucideIcon[] = [Target, UsersRound, MessageSquareQuote, Sparkles];

type TextField = keyof Pick<WorkbenchState,
  "issue" | "jurisdiction" | "advocacyMoment" | "artifactType" | "goal" | "length" | "callToAction" |
  "targetName" | "targetRole" | "publicFacts" | "strategicJudgment" | "likelyObjections" | "advocateStory" | "tone"
>;

export function WorkbenchPage() {
  const [step, setStep] = useState(() => Math.min(Number(sessionStorage.getItem("vav-workbench-step")) || 0, steps.length - 1));
  const [state, setState] = useState<WorkbenchState>(() => {
    try {
      const saved = sessionStorage.getItem("vav-workbench-state");
      return saved ? JSON.parse(saved) as WorkbenchState : demoWorkbenchState;
    } catch {
      return demoWorkbenchState;
    }
  });
  const [copyStatus, setCopyStatus] = useState("");
  const [reviewed, setReviewed] = useState<string[]>([]);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const hasMounted = useRef(false);
  const packet = useMemo(() => buildWorkPacket(state), [state]);
  const selectedClaims = evidenceClaims.filter((item) => state.selectedEvidence.includes(item.id));
  const hasResearchLead = selectedClaims.some((item) => item.verificationStatus === "research_lead");

  useEffect(() => {
    sessionStorage.setItem("vav-workbench-state", JSON.stringify(state));
    setReviewed([]);
    setCopyStatus("");
  }, [state]);

  useEffect(() => {
    sessionStorage.setItem("vav-workbench-step", String(step));
    if (hasMounted.current) stepHeadingRef.current?.focus();
    else hasMounted.current = true;
  }, [step]);

  const update = (field: TextField, value: string) => setState((current) => ({ ...current, [field]: value }));

  const toggleValue = (id: string) => setState((current) => ({
    ...current,
    selectedValues: current.selectedValues.includes(id)
      ? current.selectedValues.filter((item) => item !== id)
      : [...current.selectedValues, id],
  }));

  const toggleEvidence = (id: string) => setState((current) => ({
    ...current,
    selectedEvidence: current.selectedEvidence.includes(id)
      ? current.selectedEvidence.filter((item) => item !== id)
      : [...current.selectedEvidence, id],
  }));

  const useNycExample = () => {
    setState(demoWorkbenchState);
    setStep(0);
  };

  const startFromScratch = () => {
    setState(blankWorkbenchState);
    setStep(0);
    setReviewed([]);
  };

  const copyPacket = async () => {
    try {
      await navigator.clipboard.writeText(packet);
      setCopyStatus("Copied. Paste it into the AI writing tool you use.");
    } catch {
      setCopyStatus("Copy is unavailable here. Open the preview below and copy the text manually.");
    }
  };

  const downloadPacket = () => {
    const blob = new Blob([packet], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "advocacy-work-packet.md";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="workbench-page section-pad">
      <div className="page-heading workbench-heading">
        <h1>Build your advocacy work packet.</h1>
        <div className="demo-controls" aria-label="Starting point">
          <button className="button button-quiet" type="button" onClick={useNycExample}><MapPinned aria-hidden="true" size={17} />Use the NYC example</button>
          <button className="text-button" type="button" onClick={startFromScratch}><FilePlus aria-hidden="true" size={16} />Start from scratch</button>
        </div>
      </div>

      <ol className="stepper" aria-label="Workbench progress">
        {steps.map((label, index) => (
          <li key={label} className={index === step ? "active" : index < step ? "complete" : ""}>
            <button type="button" onClick={() => setStep(index)} aria-current={index === step ? "step" : undefined}>
              <span>{index + 1}</span><small>{label}</small>
            </button>
          </li>
        ))}
      </ol>

      <div className="workbench-card">
        {step === 0 && (
          <StepSection headingRef={stepHeadingRef} icon={stepIcons[0]} title="What are you trying to accomplish?">
            <div className="form-grid two-col">
              <TextInput label="Issue" value={state.issue} onChange={(value) => update("issue", value)} placeholder="Open primaries, ranked-choice voting…" />
              <TextInput label="Jurisdiction" value={state.jurisdiction} onChange={(value) => update("jurisdiction", value)} placeholder="City, state, or district" />
              <SelectInput label="Where will you use it?" value={state.advocacyMoment} onChange={(value) => update("advocacyMoment", value)} options={["Public hearing", "Email outreach", "Legislative meeting", "Coalition briefing", "Editorial outreach"]} />
              <SelectInput label="What do you need?" value={state.artifactType} onChange={(value) => update("artifactType", value)} options={["2-minute testimony", "90-second testimony", "Email to a decision-maker", "Meeting brief", "Talking points", "Op-ed outline"]} />
              <TextInput label="What should this accomplish?" value={state.goal} onChange={(value) => update("goal", value)} placeholder="Persuade, recruit, brief…" />
              <TextInput label="Length" value={state.length} onChange={(value) => update("length", value)} placeholder="2 minutes, 250 words…" />
            </div>
            <TextArea label="What exactly should the audience do?" value={state.callToAction} onChange={(value) => update("callToAction", value)} hint="Name one specific action this person or group can take." />
          </StepSection>
        )}

        {step === 1 && (
          <StepSection headingRef={stepHeadingRef} icon={stepIcons[1]} title="Who are you speaking to—and why are you the right messenger?">
            <div className="form-grid two-col">
              <TextInput label="Person or institution" value={state.targetName} onChange={(value) => update("targetName", value)} placeholder="Name the public audience" />
              <TextInput label="Their public role" value={state.targetRole} onChange={(value) => update("targetRole", value)} placeholder="Commissioner, legislator, editorial board…" />
            </div>
            <div className="fact-judgment-grid">
              <TextArea label="What do you know?" value={state.publicFacts} onChange={(value) => update("publicFacts", value)} hint="Public role, statements, priorities, and documented actions." />
              <TextArea label="What does that suggest?" value={state.strategicJudgment} onChange={(value) => update("strategicJudgment", value)} hint="Your judgment about what is most likely to matter to this audience." />
            </div>
            <TextArea label="What concerns might they have?" value={state.likelyObjections} onChange={(value) => update("likelyObjections", value)} />

            <h3 className="form-section-title">What should they hear in your voice?</h3>
            <fieldset className="selection-fieldset"><legend>Choose the values that should carry this message</legend>
              <div className="selection-grid values-selection">
                {vavValues.map((value) => {
                  const selected = state.selectedValues.includes(value.id);
                  return <button key={value.id} type="button" className={`select-card ${selected ? "selected" : ""}`} onClick={() => toggleValue(value.id)} aria-pressed={selected}><span className="select-indicator"><ValueIcon valueId={value.id} size={24} />{selected && <span className="select-state"><Check aria-hidden="true" size={12} strokeWidth={2.5} /></span>}</span><strong>{value.title}</strong><small>{value.description}</small></button>;
                })}
              </div>
            </fieldset>
            <TextArea label="What part of your own story belongs here?" value={state.advocateStory} onChange={(value) => update("advocateStory", value)} hint="Add the service, community, work, or lived experience that makes this issue real to you." />
            <SelectInput label="How should it sound?" value={state.tone} onChange={(value) => update("tone", value)} options={["Values-led and plainspoken", "Governance-focused and formal", "Evidence-forward and concise", "Personal and hopeful"]} />
          </StepSection>
        )}

        {step === 2 && (
          <StepSection headingRef={stepHeadingRef} icon={stepIcons[2]} title="How will you make the case?">
            <h3 className="form-section-title first">Choose the main message</h3>
            <div className="frame-list">
              {advocacyFrames.map((frame) => {
                const selected = state.selectedFrame === frame.id;
                return <button key={frame.id} type="button" className={`frame-card ${selected ? "selected" : ""}`} onClick={() => setState((current) => ({ ...current, selectedFrame: frame.id }))} aria-pressed={selected}>
                  <span className="frame-radio" aria-hidden="true">{selected ? "●" : "○"}</span>
                  <span><strong>{frame.label}</strong><small>{frame.summary}</small><em>Works well for: {frame.bestFor}</em></span>
                </button>;
              })}
            </div>
            {state.selectedFrame && (() => {
              const frame = advocacyFrames.find((item) => item.id === state.selectedFrame)!;
              return <div className="frame-guidance"><div><span><Quote aria-hidden="true" size={15} />Possible opening</span><p>“{frame.sampleOpening}”</p></div><div><span><TriangleAlert aria-hidden="true" size={15} />Avoid</span><p>{frame.watchOut}</p></div></div>;
            })()}

            <h3 className="form-section-title">Choose the evidence that helps</h3>
            <div className="evidence-picker">
              {evidenceClaims.map((item) => {
                const selected = state.selectedEvidence.includes(item.id);
                const sources = getEvidenceSourcesForClaim(item);
                return <label key={item.id} className={`evidence-choice ${selected ? "selected" : ""}`}>
                  <input type="checkbox" checked={selected} onChange={() => toggleEvidence(item.id)} />
                  <span className="evidence-check" aria-hidden="true">{selected && <Check size={14} strokeWidth={2.5} />}</span>
                  <span className="evidence-choice-copy"><small>{item.categoryLabel}</small><strong>{item.title}</strong><span>{item.claim}</span><em><b>Keep in mind:</b> {item.caveat}</em><cite>{sources.map((source) => source.title).join("; ")} · {item.verificationStatus === "research_lead" ? "refresh needed" : "source checked"}</cite></span>
                </label>;
              })}
            </div>
          </StepSection>
        )}

        {step === 3 && (
          <StepSection headingRef={stepHeadingRef} icon={stepIcons[3]} title="Use this prompt to create your draft.">
            <ol className="handoff-steps">
              <li><span>1</span><div><ClipboardCopy className="handoff-action-icon" aria-hidden="true" size={22} strokeWidth={1.8} /><strong>Copy the work packet.</strong><p>It contains your audience, story, message, evidence, and drafting instructions.</p></div></li>
              <li><span>2</span><div><ClipboardPaste className="handoff-action-icon" aria-hidden="true" size={22} strokeWidth={1.8} /><strong>Paste it into the AI writing tool you use.</strong><p>Send the entire packet as one prompt and let the tool create the first draft.</p></div></li>
              <li><span>3</span><div><UserRoundCheck className="handoff-action-icon" aria-hidden="true" size={22} strokeWidth={1.8} /><strong>Make the draft yours.</strong><p>Use the three checks below before you present or send anything.</p></div></li>
            </ol>

            <div className="packet-summary-grid">
              <article><span><UsersRound aria-hidden="true" size={16} />Audience</span><strong>{state.targetName || "Not supplied"}</strong><p>{state.targetRole || "Add a public role"}</p></article>
              <article><span><MessageSquareQuote aria-hidden="true" size={16} />Main message</span><strong>{advocacyFrames.find((item) => item.id === state.selectedFrame)?.label || "Not selected"}</strong><p>{state.selectedValues.length} VAV values included</p></article>
              <article><span><BookOpenCheck aria-hidden="true" size={16} />Evidence</span><strong>{state.selectedEvidence.length} claim{state.selectedEvidence.length === 1 ? "" : "s"}</strong><p>Source notes and cautions included</p></article>
            </div>
            {hasResearchLead && <div className="research-warning" role="alert"><TriangleAlert aria-hidden="true" size={21} strokeWidth={1.8} /><div><strong>One or more facts need to be updated.</strong><p>The prompt identifies them. Confirm the latest primary source before using them publicly.</p></div></div>}
            <div className="export-actions"><button className="button button-primary" type="button" onClick={copyPacket}><ClipboardCopy aria-hidden="true" size={17} />Copy for your AI tool</button><button className="button button-quiet" type="button" onClick={downloadPacket}><Download aria-hidden="true" size={17} />Save a copy</button><span className="copy-status" role="status">{copyStatus}</span></div>
            <details className="packet-details"><summary><ClipboardCheck aria-hidden="true" size={17} />See exactly what will be copied</summary><pre>{packet}</pre></details>

            <fieldset className="review-fieldset"><legend><ClipboardCheck aria-hidden="true" size={17} />Before you present or send the draft</legend>
              {reviewChecklist.map((item) => <label key={item}><input type="checkbox" checked={reviewed.includes(item)} onChange={() => setReviewed((current) => current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item])} /><span>{item}</span></label>)}
            </fieldset>
            <div className="completion-banner"><span className="completion-progress">{reviewed.length === reviewChecklist.length ? <CircleCheckBig aria-hidden="true" size={23} /> : <PencilLine aria-hidden="true" size={23} />}<b>{reviewed.length}/{reviewChecklist.length}</b></span><div><strong>{reviewed.length === reviewChecklist.length ? "Ready to present." : "Make the draft yours before presenting it."}</strong><p>You—not the AI tool—make the final decisions.</p></div></div>
          </StepSection>
        )}

        <div className="workbench-actions">
          <button className="button button-quiet" type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}><ArrowLeft aria-hidden="true" size={17} />Back</button>
          {step < steps.length - 1 && <button className="button button-primary" type="button" onClick={() => setStep((current) => Math.min(steps.length - 1, current + 1))}>Continue <ArrowRight aria-hidden="true" size={17} /></button>}
        </div>
      </div>
    </section>
  );
}

function StepSection({ headingRef, icon: Icon, title, children }: { headingRef: React.RefObject<HTMLHeadingElement | null>; icon: LucideIcon; title: string; children: React.ReactNode }) {
  return <div className="step-section"><div className="step-title"><span className="heading-icon"><Icon aria-hidden="true" size={24} strokeWidth={1.8} /></span><h2 ref={headingRef} tabIndex={-1}>{title}</h2></div>{children}</div>;
}

function TextInput({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <label className="field"><span>{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /></label>;
}

function TextArea({ label, value, onChange, hint }: { label: string; value: string; onChange: (value: string) => void; hint?: string }) {
  return <label className="field"><span>{label}</span>{hint && <small>{hint}</small>}<textarea value={value} onChange={(event) => onChange(event.target.value)} rows={4} /></label>;
}

function SelectInput({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return <label className="field"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}
