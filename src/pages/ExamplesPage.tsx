import { ArrowRight, Check, HeartHandshake, Landmark, Lightbulb, ListChecks, Quote, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { demoWorkbenchState } from "../data/content";

type ApproachId = "governance" | "values";

const approaches = [
  {
    id: "governance" as ApproachId,
    number: "A",
    Icon: Landmark,
    label: "Governance + evidence",
    title: "Start with institutional purpose",
    summary: "Connect participation to effective, legitimate city government. Use evidence near the center, then make a focused ask.",
    strengths: ["Best for a formal public record", "Strong connection to the audience's job", "Evidence carries the middle of the argument"],
    detailTitle: "Governance-first testimony",
    testimony: [
      {
        label: "Credibility + values",
        text: "Good evening. My name is [Name], and I am a New Yorker, a veteran, and a volunteer with Veterans for All Voters. Service taught me that our responsibility to one another does not end when the uniform comes off.",
        note: "Establish standing quickly, then lead with service rather than election mechanics.",
      },
      {
        label: "Audience bridge",
        text: "That is why I am asking this commission to consider who gets a meaningful voice in choosing city leadership. Government carries a stronger public mandate when the people who rely on its schools, transit, housing, and neighborhood services can participate in the elections that often decide who governs.",
        note: "Connect participation directly to the commission's responsibility for effective government.",
      },
      {
        label: "Qualified evidence",
        text: "The research does not say every primary reform automatically increases turnout. But recent nationwide evidence indicates that opening access to unaffiliated voters can bring more of them into primary elections and reduce the registration-based skew of the primary electorate. Studies of all-candidate systems also show promising participation gains, though that evidence is still emerging.",
        note: "Use the strongest supported finding and say plainly where the evidence remains limited.",
      },
      {
        label: "Shared purpose",
        text: "Parties have a legitimate role in our democracy. But public elections must ultimately serve the whole public. This is not about helping one side defeat another. It is about asking leaders to earn support from more of the people they represent.",
        note: "Answer the predictable anti-party objection without abandoning the reform case.",
      },
      {
        label: "Specific ask",
        text: "I respectfully ask the commission to recommend that New Yorkers have the opportunity to vote on an open, all-candidate primary system, with careful implementation and public review. Give voters the chance to choose a system that gives every eligible New Yorker a meaningful voice. Thank you.",
        note: "Name the action, decision-maker, reform model, and next democratic step.",
      },
    ],
    opening: "City government works best when the people who rely on it have a meaningful voice in choosing its leadership.",
    why: ["Begins with the commission's responsibility", "Moves naturally from government performance to participation", "Leaves room for qualified evidence", "Does not promise an automatic outcome"],
  },
  {
    id: "values" as ApproachId,
    number: "B",
    Icon: HeartHandshake,
    label: "Values + lived experience",
    title: "Start with service",
    summary: "Use veteran and community experience to make the human reason for reform clear, then connect that story to voter voice and trust.",
    strengths: ["Best for spoken testimony", "Strong personal credibility", "A memorable values-led opening"],
    detailTitle: "Values-first testimony",
    testimony: [
      {
        label: "Personal introduction",
        text: "Good evening. My name is [Name]. I am a New Yorker, a veteran, and a volunteer with Veterans for All Voters. I am here because I believe service continues when we come home.",
        note: "Make the speaker—not the organization or the policy—the starting point.",
      },
      {
        label: "Shared-service story",
        text: "In the military, I served alongside Americans from every background and every point of view. We did not ask one another how we voted before we did the job in front of us. We shared responsibility, relied on one another, and put the mission first.",
        note: "Use one concrete experience to establish the values that will guide the argument.",
      },
      {
        label: "Values bridge",
        text: "That is the spirit I bring here tonight. New Yorkers who work, raise families, serve their neighborhoods, and live with every decision city government makes should have a meaningful voice in the elections that often decide who leads it.",
        note: "Turn the personal story into a public principle without changing voices abruptly.",
      },
      {
        label: "Evidence + reassurance",
        text: "Recent evidence indicates that opening access can bring more unaffiliated voters into primary elections and reduce registration-based skew. That does not make reform a magic fix, and parties still have a legitimate role. It does mean we have a practical way to ask city leaders to answer to more of the people they represent.",
        note: "Use one qualified finding, then address the strongest objection directly.",
      },
      {
        label: "Specific ask",
        text: "I ask this commission to give New Yorkers the opportunity to vote on an open, all-candidate primary system. Veterans know that trust is earned through action. This is one action the city can take to give every voter a real voice. Thank you.",
        note: "Return to the opening value and make the action unmistakable.",
      },
    ],
    opening: "I am here because I believe service continues when we come home.",
    why: ["Sounds like a person rather than a policy memo", "Makes veteran experience relevant without overexplaining it", "Creates an emotional reason to hear the evidence", "Returns to service in the final ask"],
  },
];

const anatomy = [
  ["Open with purpose", "Give the audience a reason to care before explaining the policy."],
  ["Show why you are here", "Use the part of your experience that makes this issue real to you."],
  ["Connect to the audience", "Tie your concern to the decision-maker's actual responsibility."],
  ["Use evidence carefully", "Choose one or two findings and keep their limitations attached."],
  ["Make one clear ask", "End with the exact action this person or group can take."],
];

export function ExamplesPage() {
  const [selectedId, setSelectedId] = useState<ApproachId>("governance");
  const selected = approaches.find((approach) => approach.id === selectedId)!;

  const openNycExample = () => {
    sessionStorage.setItem("vav-workbench-state", JSON.stringify(demoWorkbenchState));
    sessionStorage.setItem("vav-workbench-step", "0");
  };

  return <section className="section-pad interior-page examples-page">
    <div className="page-heading"><h1>Choose a testimony approach.</h1><a className="button button-primary" href="#/workbench" onClick={openNycExample}>Use the NYC example <ArrowRight aria-hidden="true" size={18} strokeWidth={2} /></a></div>

    <fieldset className="example-directions">
      <legend className="sr-only">Choose a testimony approach</legend>
      {approaches.map((approach) => {
        const isSelected = approach.id === selectedId;
        const inputId = `approach-${approach.id}`;
        return <div className="example-option" key={approach.id}>
          <input id={inputId} type="radio" name="testimony-approach" value={approach.id} checked={isSelected} aria-labelledby={`${inputId}-title`} aria-describedby={`${inputId}-summary`} onChange={() => setSelectedId(approach.id)} />
          <label className={`example-card ${isSelected ? "featured" : ""}`} htmlFor={inputId}>
            <span className="example-icon" aria-hidden="true"><approach.Icon size={30} strokeWidth={1.7} /></span>
            <span className="approach-choice">Approach {approach.number}{isSelected && <> <Check aria-hidden="true" size={13} /> Selected</>}</span>
            <strong className="example-card-title" id={`${inputId}-title`}>{approach.title}</strong>
            <span className="example-card-summary" id={`${inputId}-summary`}>{approach.summary}</span>
            <span className="example-card-strengths">{approach.strengths.map((strength) => <span className="example-card-strength" key={strength}><Check aria-hidden="true" size={14} strokeWidth={2} />{strength}</span>)}</span>
          </label>
        </div>;
      })}
    </fieldset>

    <p className="sr-only" aria-live="polite">Selected: {selected.title}.</p>
    <section className="full-testimony-section">
      <h2>{selected.detailTitle}</h2>
      <div className="annotated-testimony">
        <div className="testimony-script" aria-label={`${selected.detailTitle} script`}>
          {selected.testimony.map((section) => <p key={section.label}>{section.text}</p>)}
          <div className="testimony-sources"><strong><TriangleAlert aria-hidden="true" size={15} />Evidence to verify before use</strong><span>Bipartisan Policy Center, 2024 · Evidence Review, pp. 6–7 and 14</span><span>Evidence Review executive summary, p. 1</span></div>
        </div>
        <ol className="annotation-rail" aria-label={`${selected.detailTitle} annotations`}>
          {selected.testimony.map((section, index) => <li key={section.label}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{section.label}</strong><p>{section.note}</p></div></li>)}
        </ol>
      </div>
    </section>

    <section className="anatomy-section">
      <span className="heading-icon"><ListChecks aria-hidden="true" size={24} strokeWidth={1.8} /></span>
      <h2>What every short testimony needs to do.</h2>
      <ol className="anatomy-list">{anatomy.map(([title, description], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
    </section>

    <section className="sample-annotation">
      <div className="sample-copy"><Quote className="sample-quote-icon" aria-hidden="true" size={26} strokeWidth={1.6} /><blockquote>{selected.opening}</blockquote><p>This opening sets the direction for the selected approach before the policy details appear.</p></div>
      <aside><span className="why-label"><Lightbulb aria-hidden="true" size={17} />Why it works</span><ul>{selected.why.map((reason) => <li key={reason}>{reason}</li>)}</ul></aside>
    </section>
  </section>;
}
