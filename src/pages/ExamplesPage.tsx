import { ArrowRight, Check, HeartHandshake, Landmark, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { demoWorkbenchState } from "../data/content";

type ApproachId = "governance" | "values";

const approaches = [
  {
    id: "governance" as ApproachId,
    number: "A",
    Icon: Landmark,
    title: "Start with institutional purpose",
    summary: "Connect participation to effective, legitimate city government. Use evidence near the center, then make a focused ask.",
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
  },
  {
    id: "values" as ApproachId,
    number: "B",
    Icon: HeartHandshake,
    title: "Start with service",
    summary: "Use veteran and community experience to make the human reason for reform clear, then connect that story to voter voice and trust.",
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
  },
];

export function ExamplesPage() {
  const [selectedId, setSelectedId] = useState<ApproachId>("governance");
  const selected = approaches.find((approach) => approach.id === selectedId)!;

  const openNycExample = () => {
    sessionStorage.setItem("vav-workbench-state", JSON.stringify(demoWorkbenchState));
    sessionStorage.setItem("vav-workbench-step", "0");
  };

  return <section className="adv-depth-page adv-examples-page">
    <header className="adv-depth-header">
      <div>
        <h1>The same evidence can support two honest message strategies.</h1>
        <p>Compare how institutional purpose and lived experience change the opening, sequence, and emphasis without changing the factual record.</p>
      </div>
    </header>

    <fieldset className="adv-approach-selector">
      <legend className="sr-only">Choose a testimony approach</legend>
      {approaches.map((approach) => {
        const isSelected = approach.id === selectedId;
        const inputId = `approach-${approach.id}`;
        return <div className="adv-approach-option" key={approach.id}>
          <input id={inputId} type="radio" name="testimony-approach" value={approach.id} checked={isSelected} aria-labelledby={`${inputId}-title`} aria-describedby={`${inputId}-summary`} onChange={() => setSelectedId(approach.id)} />
          <label className={isSelected ? "selected" : ""} htmlFor={inputId}>
            <approach.Icon aria-hidden="true" size={25} />
            <span><strong id={`${inputId}-title`}>Approach {approach.number}: {approach.title}</strong><span id={`${inputId}-summary`}>{approach.summary}</span></span>
            {isSelected && <Check aria-hidden="true" size={18} />}
          </label>
        </div>;
      })}
    </fieldset>

    <p className="sr-only" aria-live="polite">Selected: {selected.title}.</p>
    <section className="adv-testimony-section">
      <h2>{selected.detailTitle}</h2>
      <div className="adv-annotated-testimony">
        <div className="adv-testimony-script" aria-label={`${selected.detailTitle} script`}>
          {selected.testimony.map((section) => <p key={section.label}>{section.text}</p>)}
          <div className="adv-testimony-warning"><TriangleAlert aria-hidden="true" size={18} /><p><strong>Evidence to verify before use:</strong> Bipartisan Policy Center, 2024, pp. 6–7 and 14; preserve the Evidence Review executive-summary qualification.</p></div>
        </div>
        <ol className="adv-annotation-rail" aria-label={`${selected.detailTitle} annotations`}>
          {selected.testimony.map((section, index) => <li key={section.label}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{section.label}</strong><p>{section.note}</p></div></li>)}
        </ol>
      </div>
    </section>

    <div className="adv-example-action">
      <div><h2>Build from the complete NYC example.</h2><p>The workbench opens with audience, values, evidence, and caveats already populated for review.</p></div>
      <a className="button button-primary" href="#/workbench" onClick={openNycExample}>Open the NYC workbench <ArrowRight aria-hidden="true" size={18} /></a>
    </div>

    <nav className="adv-depth-links" aria-label="More Advocacy Workbench detail">
      <a href="#/method">See the design method</a>
      <a href="#/sources">Inspect the evidence records</a>
      <a href="#/about">Review the pilot boundaries</a>
    </nav>
  </section>;
}
