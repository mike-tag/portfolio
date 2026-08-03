import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  HeartHandshake,
  Mic2,
  Network,
  PackageOpen,
  SearchCheck,
  Store,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PortfolioActions } from "../components/PortfolioActions";

type Experience = {
  id: "transformation" | "advocacy" | "skills";
  product: string;
  problem: string;
  description: string;
  href: string;
  cta: string;
  journey: Array<{ label: string; Icon: LucideIcon }>;
};

const experiences: Experience[] = [
  {
    id: "transformation",
    product: "Consulting Reformed",
    problem: "I need to turn AI potential into a practical role redesign.",
    description: "Explore an interactive method for turning a job posting into a task map, governed role design, and practical pilot plan.",
    href: "#/transformation",
    cta: "Explore role transformation",
    journey: [
      { label: "Role", Icon: BriefcaseBusiness },
      { label: "Tasks", Icon: Network },
      { label: "Redesign", Icon: Workflow },
    ],
  },
  {
    id: "skills",
    product: "Skills market",
    problem: "I need an AI collaborator that understands design principles and leaves me with a usable plan.",
    description: "Try a short simulation, see the design principles behind the workflow, and install the published skill from GitHub.",
    href: "#/skills",
    cta: "Explore and install skills",
    journey: [
      { label: "Inspect", Icon: SearchCheck },
      { label: "Decide", Icon: Store },
      { label: "Reuse", Icon: PackageOpen },
    ],
  },
  {
    id: "advocacy",
    product: "Advocacy Workbench",
    problem: "I need to make a clear 60-second case for voter reform.",
    description: "See how values, audience, story, and qualified evidence become a structured prompt for testimony and outreach.",
    href: "#/advocacy",
    cta: "Try the advocacy workflow",
    journey: [
      { label: "Story", Icon: HeartHandshake },
      { label: "Evidence", Icon: BookOpenCheck },
      { label: "Script", Icon: Mic2 },
    ],
  },
];

const portfolioDepth = [
  {
    level: "Organization",
    detail: "Align people, roles, and governance",
    Icon: Building2,
  },
  {
    level: "Workflow",
    detail: "Redesign how work gets done",
    Icon: Workflow,
  },
  {
    level: "Task",
    detail: "Make expert methods reusable",
    Icon: PackageOpen,
  },
];

export function ExperiencePage() {
  return (
    <div className="portfolio-page">
      <section className="portfolio-hero" aria-labelledby="portfolio-title">
        <img
          className="portfolio-portrait"
          src="./mike-tagariello-headshot-illustrated.png"
          alt="Mike Tagariello"
        />

        <div className="portfolio-intro">
          <h1 id="portfolio-title"><span>Mike Tagariello</span>I turn AI capabilities into better work and lasting value.</h1>
          <p className="portfolio-summary">I align senior leaders, redesign workflows with the people doing the work, and lead adoption and value measurement from objectives to impact.</p>
          <PortfolioActions />
        </div>
      </section>

      <section className="portfolio-proof" aria-label="Professional experience highlights">
        <div><strong>10+</strong><span>Years making technology work for people</span></div>
        <div><strong>10</strong><span>Clients helped with AI in three years</span></div>
        <div><strong>50k+</strong><span>People reached in just one project</span></div>
      </section>

      <p className="portfolio-background">U.S. Air Force veteran, Columbia University graduate, and Accenture consultant.</p>

      <section className="portfolio-work section-pad" aria-labelledby="work-title">
        <div className="portfolio-work-heading">
          <h2 id="work-title">How I work with AI</h2>
        </div>

        <ul className="portfolio-depth-map" aria-label="Three independent levels of AI integration">
          {portfolioDepth.map(({ level, detail, Icon }) => (
            <li key={level}>
              <span className="portfolio-depth-level"><Icon aria-hidden="true" size={21} strokeWidth={1.7} />{level}</span>
              <span className="portfolio-depth-detail">{detail}</span>
            </li>
          ))}
        </ul>

        <div className="experience-grid">
          {experiences.map((experience) => (
            <a
              className={`experience-card experience-card-${experience.id}`}
              href={experience.href}
              key={experience.id}
              aria-label={`${experience.problem} ${experience.description} ${experience.cta}: ${experience.product}`}
            >
              <h3>“{experience.problem}”</h3>
              <span className="experience-journey" aria-hidden="true">
                {experience.journey.map(({ label, Icon }, index) => (
                  <span className="experience-journey-step" key={label}>
                    <span><Icon size={24} strokeWidth={1.7} /></span>
                    <strong>{label}</strong>
                    {index < experience.journey.length - 1 && <ArrowRight className="experience-journey-arrow" size={18} strokeWidth={1.8} />}
                  </span>
                ))}
              </span>
              <span className="experience-cta">{experience.cta}<ArrowRight aria-hidden="true" size={19} strokeWidth={2} /></span>
            </a>
          ))}
        </div>
      </section>

      <section className="portfolio-closing-actions" aria-label="Connect with Mike">
        <PortfolioActions />
      </section>
    </div>
  );
}
