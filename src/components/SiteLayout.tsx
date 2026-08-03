import { BookOpenCheck, House, PencilLine, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { routeDefinitions } from "../routes";
import type { PageId } from "../types";

const advocacyNavItems: Array<{ id: PageId; label: string; Icon: LucideIcon }> = [
  { id: "advocacy", label: "Case study", Icon: House },
  { id: "workbench", label: "Try the workbench", Icon: PencilLine },
  { id: "sources", label: "Evidence", Icon: BookOpenCheck },
];

const portfolioNavItems: Array<{ id: PageId; level: string; project: string }> = [
  { id: "transformation", level: "Organization", project: "Role redesign" },
  { id: "advocacy", level: "Workflow", project: "Advocacy Workbench" },
  { id: "skills", level: "Task", project: "Design Planning" },
];

type SiteLayoutProps = {
  page: PageId;
  children: ReactNode;
};

export function SiteLayout({ page, children }: SiteLayoutProps) {
  const route = routeDefinitions[page];
  const isPortfolioHome = route.surface === "portfolio-home";
  const isPortfolioCase = route.surface === "portfolio-case";
  const isAdvocacyProduct = route.surface === "advocacy-product";
  const shellClass = [
    isPortfolioHome ? "gateway-shell" : "",
    isPortfolioCase ? "portfolio-case-shell" : "",
    page === "transformation" ? "transformation-shell" : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={`site-shell ${shellClass}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      {!isPortfolioHome && <header className={`site-header ${isPortfolioCase ? "portfolio-case-header" : ""}`}>
        {isPortfolioCase ? (
          <a className="brand portfolio-case-brand" href="#/" aria-label="Mike Tagariello portfolio home">
            <span className="brand-mark portfolio-profile-mark" aria-hidden="true">
              <img src="./mike-tagariello-headshot-illustrated.png" alt="" />
            </span>
            <span>
              <strong>Mike Tagariello</strong>
              <small>{route.projectLabel}</small>
            </span>
          </a>
        ) : (
          <a className="brand" href="#/advocacy" aria-label="Advocacy Workbench case study">
            <span className="brand-mark" aria-hidden="true">V</span>
            <span>
              <strong>Advocacy Workbench</strong>
              <small>Open primaries pilot</small>
            </span>
          </a>
        )}
        <div className="header-actions">
          {isPortfolioCase && <nav className="portfolio-case-nav" aria-label="Portfolio projects">
            <a href="#/">Portfolio home</a>
            {portfolioNavItems.map(({ id, level, project }) => (
              <a key={id} href={`#/${id}`} aria-current={page === id ? "page" : undefined}>
                <strong>{level}</strong>
                <small>{project}</small>
              </a>
            ))}
          </nav>}
          {isAdvocacyProduct && <nav className="site-nav" aria-label="Advocacy navigation">
            {advocacyNavItems.map(({ id, label, Icon }) => (
              <a key={id} href={`#/${id}`} aria-current={page === id ? "page" : undefined}>
                <Icon aria-hidden="true" size={15} strokeWidth={1.9} />{label}
              </a>
            ))}
          </nav>}
        </div>
      </header>}
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div>
          {isPortfolioHome || isPortfolioCase ? (
            <span className="footer-profile" aria-hidden="true">
              <img src="./mike-tagariello-headshot-illustrated.png" alt="" />
            </span>
          ) : (
            <span className="footer-mark" aria-hidden="true">V</span>
          )}
          <p><strong>{isPortfolioHome || isPortfolioCase ? "Mike Tagariello" : "Veterans for All Voters Advocacy Workbench"}</strong><br />{isPortfolioHome || isPortfolioCase ? "Practical systems for complex change" : "Open primaries example"}</p>
        </div>
        <p className="footer-privacy"><ShieldCheck aria-hidden="true" size={20} strokeWidth={1.7} /><span>{isPortfolioHome || isPortfolioCase ? "These static demonstrations make no network calls." : "This beta creates a work packet and drafting prompt. It does not send your information anywhere."}</span></p>
      </footer>
    </div>
  );
}
