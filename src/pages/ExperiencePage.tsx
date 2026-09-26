import { ArrowRight } from "lucide-react";
import { PortfolioActions } from "../components/PortfolioActions";
import { portfolioHref, portfolioSections } from "../data/portfolio";
import "./ExperiencePage.css";

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
          <a className="portfolio-explore-work" href={portfolioHref("work")}>Explore my work <ArrowRight aria-hidden="true" size={20} /></a>
        </div>
      </section>

      <section className="portfolio-proof" aria-label="Professional experience highlights">
        <div><strong>10+</strong><span>Years making technology work for people</span></div>
        <div><strong>10</strong><span>Clients helped with AI in three years</span></div>
        <div><strong>50k+</strong><span>People reached in just one project</span></div>
      </section>

      <p className="portfolio-background">U.S. Air Force veteran, Columbia University graduate, and Accenture consultant.</p>

      <section className="portfolio-work section-pad" id="portfolio-work" aria-labelledby="work-title">
        <div className="portfolio-work-heading">
          <h2 id="work-title" tabIndex={-1}>How I work with AI</h2>
        </div>

        <div className="work-story">
          {portfolioSections.map(chapter => (
            <article className="work-story-chapter" id={`work-${chapter.id}`} key={chapter.id} aria-labelledby={`work-${chapter.id}-title`}>
              <img src={`./work-story/${chapter.image}`} alt={chapter.alt} width={1536} height={1024} loading="lazy" decoding="async" />
              <div className="work-story-copy">
                <h3 id={`work-${chapter.id}-title`} tabIndex={-1}>{chapter.title}</h3>
                <div className="work-story-links">
                  {chapter.pages.map(link => (
                    <a href={portfolioHref(link.id)} key={link.id}>
                      {link.label}<ArrowRight aria-hidden="true" size={19} />
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-closing-actions" aria-label="Connect with Mike">
        <PortfolioActions />
      </section>
    </div>
  );
}
