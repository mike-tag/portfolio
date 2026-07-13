import { ArrowRight, CircleSlash2, ClipboardCheck, Flag, Laptop, Layers, ListChecks } from "lucide-react";

const roadmap = [
  { when: "Today", title: "Open primaries pilot", description: "A guided NYC example, VAV message principles, an evidence library, and a copyable work packet.", Icon: Flag },
  { when: "Next", title: "Volunteer testing", description: "Measure time to first useful draft, messaging consistency, evidence completeness, usability, and reviewer burden.", Icon: ClipboardCheck },
  { when: "Later", title: "More issue playbooks", description: "Extend the same architecture to ranked-choice voting, unified primaries, election administration, and other VAV priorities.", Icon: Layers },
];

export function AboutPage() {
  return <section className="section-pad interior-page about-page">
    <div className="page-heading"><h1>A repeatable advocacy tool for VAV volunteers.</h1></div>
    <div className="about-grid">{roadmap.map(({ when, title, description, Icon }) => <article key={when}>
      <div className="about-card-top"><span className="concept-icon"><Icon aria-hidden="true" size={24} strokeWidth={1.8} /></span><span className="about-kicker">{when}</span></div>
      <h2>{title}</h2><p>{description}</p>
    </article>)}</div>
    <section className="promise-panel">
      <div><span className="promise-icon"><ListChecks aria-hidden="true" size={28} strokeWidth={1.7} /></span><h2>A disciplined way to prepare.</h2><p>It helps an advocate understand the audience, choose the right values, use evidence responsibly, and create a strong starting point for human judgment.</p></div>
      <div><span className="promise-icon"><CircleSlash2 aria-hidden="true" size={28} strokeWidth={1.7} /></span><h2>Not an automatic persuader.</h2><p>It does not replace fact-checking, relationships, local knowledge, or the volunteer's responsibility for the final message.</p></div>
    </section>
    <section className="local-first"><div className="local-icon"><Laptop aria-hidden="true" size={25} strokeWidth={1.7} /></div><div><h2>Local by design</h2><p>The pilot has no accounts, analytics, backend, or AI connection. Information entered into the workbench remains in the current browser session.</p></div><a className="button button-primary" href="#/workbench">Try it now <ArrowRight aria-hidden="true" size={18} strokeWidth={2} /></a></section>
  </section>;
}
