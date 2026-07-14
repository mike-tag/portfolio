import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  ExternalLink,
  HeartHandshake,
  Mic2,
  Network,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Experience = {
  id: "transformation" | "advocacy";
  product: string;
  organization: string;
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
    organization: "Featured project · Transformation Factory",
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
    id: "advocacy",
    product: "Advocacy Workbench",
    organization: "Veterans for All Voters",
    problem: "I need to make a clear 60-second case for voter reform.",
    description: "See how values, audience, story, and qualified evidence become a structured prompt for testimony and outreach.",
    href: "#/workbench",
    cta: "Build an advocacy prompt",
    journey: [
      { label: "Story", Icon: HeartHandshake },
      { label: "Evidence", Icon: BookOpenCheck },
      { label: "Script", Icon: Mic2 },
    ],
  },
];

export function ExperiencePage() {
  return (
    <div className="portfolio-page">
      <section className="portfolio-hero" aria-labelledby="portfolio-title">
        <img
          className="portfolio-portrait"
          src="./mike-tagariello-headshot.png"
          alt="Mike Tagariello"
        />

        <div className="portfolio-intro">
          <h1 id="portfolio-title"><span>Mike Tagariello</span>I turn generative AI into systems that stick.</h1>
          <p className="portfolio-summary">I lead transformation from objectives to impact—aligning senior leaders, turning strategy into hands-on workflows, and leading value measurement.</p>
          <a
            className="portfolio-linkedin"
            href="https://www.linkedin.com/in/miketagariello/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="linkedin-mark" aria-hidden="true">in</span>
            Connect with Mike on LinkedIn
            <ExternalLink aria-hidden="true" size={15} strokeWidth={2} />
          </a>
        </div>
      </section>

      <section className="portfolio-proof" aria-label="Professional experience highlights">
        <div><strong>10+</strong><span>Years bridging strategy and operations with technology solutions</span></div>
        <div><strong>10</strong><span>AI projects in 3 years</span></div>
        <div><strong>50k+</strong><span>People reached in just one project</span></div>
      </section>

      <p className="portfolio-background">U.S. Air Force veteran, Columbia University graduate, and Accenture consultant.</p>

      <section className="portfolio-work section-pad" aria-labelledby="work-title">
        <div className="portfolio-work-heading">
          <h2 id="work-title">Selected work: Start with the problem you want to solve</h2>
        </div>

        <div className="experience-grid">
          {experiences.map((experience) => (
            <a
              className={`experience-card experience-card-${experience.id}`}
              href={experience.href}
              key={experience.id}
              aria-label={`${experience.problem} Explore ${experience.product}`}
            >
              <span className="experience-product">
                <strong>{experience.product}</strong>
                <small>{experience.organization}</small>
              </span>
              <h3>“{experience.problem}”</h3>
              <p>{experience.description}</p>
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
    </div>
  );
}
