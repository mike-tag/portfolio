import { ShieldCheck } from "lucide-react";
import { PortfolioNavigation, PortfolioNextWork } from "./PortfolioNavigation";
import type { ReactNode } from "react";
import { routeDefinitions } from "../routes";
import type { PageId } from "../types";

type SiteLayoutProps = {
  page: PageId;
  children: ReactNode;
};

export function SiteLayout({ page, children }: SiteLayoutProps) {
  const route = routeDefinitions[page];
  const isPortfolioHome = route.surface === "portfolio-home";
  const isPortfolioCase = route.surface === "portfolio-case";
  const isPresentation = route.surface === "presentation";
  const shellClass = [
    isPortfolioHome ? "gateway-shell" : "",
    isPortfolioCase ? "portfolio-case-shell" : "",
    isPresentation ? (page === "enterprise-build" ? "enterprise-build-shell" : "the-build-shell") : "",
    page === "transformation" ? "transformation-shell" : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={`site-shell ${shellClass}`}>
      <a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); document.getElementById("main-content")?.focus(); }}>Skip to content</a>
      {page !== "the-build" && <PortfolioNavigation page={page} />}
      <main id="main-content" tabIndex={-1}>{children}</main>
      <PortfolioNextWork page={page} />
      {!isPresentation && <footer className="site-footer">
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
      </footer>}
    </div>
  );
}
