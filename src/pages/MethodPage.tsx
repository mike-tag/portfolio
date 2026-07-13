import { ArrowRight, FileCheck2, Lightbulb, ShieldAlert, Split } from "lucide-react";

const methodSteps = [
  ["01", "Set the assignment", "Define the real moment, goal, constraint, and action you want."],
  ["02", "Know the audience and your story", "Use public facts to understand the audience, then choose the values and experience only you can bring."],
  ["03", "Build the case", "Choose one main message and a small number of evidence claims with their limits attached."],
  ["04", "Draft, adapt, and present", "Use the prompt in an AI writing tool, then make the result sound like you and fit the actual situation."],
];

export function MethodPage() {
  return <section className="section-pad interior-page method-page">
    <div className="page-heading"><h1>Turn good advocacy judgment into a repeatable process.</h1></div>
    <div className="method-flow">{methodSteps.map(([number, title, description]) => <article key={number}><span>{number}</span><div><h2>{title}</h2><p>{description}</p></div></article>)}</div>
    <div className="method-principles">
      <article>
        <span className="heading-icon"><Split aria-hidden="true" size={24} strokeWidth={1.8} /></span>
        <h2>Separate what you know from what you think it means.</h2>
        <p>Public roles, statements, priorities, and actions form the factual record. The advocate then makes an explicit strategic judgment about what those facts mean for framing, objections, and messengers.</p>
        <div className="mini-comparison">
          <div><span className="comparison-label"><FileCheck2 aria-hidden="true" size={16} />Known public fact</span><p>The commission emphasizes effective government and outcomes for working people.</p></div>
          <div><span className="comparison-label"><Lightbulb aria-hidden="true" size={16} />Strategic judgment</span><p>Lead with legitimacy, service delivery, and public mandate—not exclusion alone.</p></div>
        </div>
      </article>
      <article>
        <span className="heading-icon"><ShieldAlert aria-hidden="true" size={24} strokeWidth={1.8} /></span>
        <h2>Keep the caveat with the claim.</h2>
        <p>Evidence becomes less useful when a draft overstates it. Every claim record carries its best use, reform design, scope, and limitation into the final work packet.</p>
        <blockquote>“The evidence does not support a simple claim that opening primaries increases turnout across all designs.”<cite>Evidence Review, executive summary</cite></blockquote>
      </article>
    </div>
    <div className="method-cta"><h2>Try it with the NYC example.</h2><a className="button button-primary" href="#/workbench">Open the workbench <ArrowRight aria-hidden="true" size={18} strokeWidth={2} /></a></div>
  </section>;
}
