import { ArrowRight, BookOpenCheck, FileText, HeartHandshake, LayoutTemplate, Mail, Megaphone, Mic2, Quote, Sparkles, Target, UsersRound } from "lucide-react";
import { ValueIcon } from "../components/ValueIcon";
import { vavValues } from "../data/content";

const volunteerInputs = [
  { label: "Story", Icon: Quote },
  { label: "Values", Icon: HeartHandshake },
  { label: "Goal", Icon: Target },
];

const workbenchInputs = [
  { label: "Audience", Icon: UsersRound },
  { label: "Evidence", Icon: BookOpenCheck },
  { label: "Structure", Icon: LayoutTemplate },
];

const outputFormats = [
  { label: "Testimony", Icon: Mic2 },
  { label: "Email", Icon: Mail },
  { label: "Outreach", Icon: Megaphone },
];

export function HomePage() {
  return (
    <>
      <section className="home-hero section-pad">
        <div className="home-hero-intro">
          <p className="problem-statement">You know why it matters. <strong>Finding the right words is the hard part.</strong></p>
          <h1>Make your case.</h1>
          <a className="button button-primary button-hero" href="#/workbench">Create my AI prompt <ArrowRight aria-hidden="true" size={20} strokeWidth={2.25} /></a>
        </div>

        <ol className="advocacy-flow" aria-label="How the workbench turns what a volunteer brings into an AI prompt for testimony, email, or outreach">
          <li className="flow-stage">
            <header className="flow-stage-header"><h2>You bring</h2></header>
            <div className="flow-stage-visual flow-volunteer-visual"><img src="./volunteer-advocate.png" alt="Veteran volunteer preparing notes to speak at a public hearing" width="1254" height="1254" /></div>
            <div className="flow-actions">
              {volunteerInputs.map(({ label, Icon }) => <span key={label}><Icon aria-hidden="true" size={20} strokeWidth={1.8} /><strong>{label}</strong></span>)}
            </div>
            <span className="flow-next" aria-hidden="true"><ArrowRight size={24} strokeWidth={1.8} /></span>
          </li>

          <li className="flow-stage">
            <header className="flow-stage-header"><h2>Workbench adds</h2></header>
            <div className="flow-stage-visual flow-workbench-visual"><span className="flow-workbench-mark"><Sparkles aria-hidden="true" size={42} strokeWidth={1.55} /></span><strong>Guidance + sources</strong></div>
            <div className="flow-actions">
              {workbenchInputs.map(({ label, Icon }) => <span key={label}><Icon aria-hidden="true" size={20} strokeWidth={1.8} /><strong>{label}</strong></span>)}
            </div>
            <span className="flow-next" aria-hidden="true"><ArrowRight size={24} strokeWidth={1.8} /></span>
          </li>

          <li className="flow-stage">
            <header className="flow-stage-header"><h2>You get</h2></header>
            <div className="flow-stage-visual flow-result-visual"><div className="result-document" aria-hidden="true"><div><FileText size={24} strokeWidth={1.7} /><Sparkles size={22} strokeWidth={1.7} /></div><span /><span /><span /><span /></div><strong>Prompt for your AI tool</strong></div>
            <div className="flow-actions">
              {outputFormats.map(({ label, Icon }) => <span key={label}><Icon aria-hidden="true" size={20} strokeWidth={1.8} /><strong>{label}</strong></span>)}
            </div>
          </li>
        </ol>
      </section>

      <section className="home-values section-pad">
        <h2>Built around Veterans for All Voters values.</h2>
        <div className="values-compact-grid">
          {vavValues.map((value) => <article key={value.id}><span className="concept-icon"><ValueIcon valueId={value.id} size={38} strokeWidth={1.7} /></span><strong>{value.shortLabel}</strong></article>)}
        </div>
      </section>
    </>
  );
}
